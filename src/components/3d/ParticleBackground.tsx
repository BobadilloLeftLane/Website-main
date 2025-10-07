import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { ParticleSystemProps } from '@/types'

const ParticleBackground = ({
  count,
  color,
  speed,
  size,
  interactive
}: ParticleSystemProps) => {
  const meshRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Generate particle positions and properties
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    const colorObj = new THREE.Color(color)

    for (let i = 0; i < count; i++) {
      // Random positions in 3D space
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Color variations
      const hue = Math.random() * 0.1 - 0.05
      const saturation = 0.8 + Math.random() * 0.2
      const lightness = 0.5 + Math.random() * 0.5

      const particleColor = colorObj.clone()
      particleColor.offsetHSL(hue, saturation - 1, lightness - 0.5)

      colors[i * 3] = particleColor.r
      colors[i * 3 + 1] = particleColor.g
      colors[i * 3 + 2] = particleColor.b

      // Random scales
      scales[i] = Math.random() * 0.5 + 0.5
    }

    return { positions, colors, scales }
  }, [count, color])

  // Mouse interaction setup
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime

    // Base rotation
    meshRef.current.rotation.x += delta * speed * 0.1
    meshRef.current.rotation.y += delta * speed * 0.15

    // Interactive mouse effects
    if (interactive) {
      const { x, y } = mouseRef.current
      meshRef.current.rotation.x += (y * 0.001 - meshRef.current.rotation.x) * 0.05
      meshRef.current.rotation.y += (x * 0.001 - meshRef.current.rotation.y) * 0.05
    }

    // Animate individual particles
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array
    const originalPositions = particles.positions

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Floating animation
      positions[i3 + 1] = originalPositions[i3 + 1] + Math.sin(time + i * 0.1) * 0.5

      // Pulsing effect
      if (i % 10 === 0) {
        const scale = 1 + Math.sin(time * 2 + i * 0.1) * 0.3
        positions[i3] = originalPositions[i3] * scale
        positions[i3 + 2] = originalPositions[i3 + 2] * scale
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        vertexColors
        size={size}
        sizeAttenuation={true}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default ParticleBackground