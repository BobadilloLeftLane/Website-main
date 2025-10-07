import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CyberpunkPlanetProps {
  size?: number
  nodeCount?: number
  interactive?: boolean
}

const CyberpunkPlanet = ({
  size = 2
}: CyberpunkPlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Group>(null)
  const coreOrbsRef = useRef<THREE.Group>(null)
  const [isClicked, setIsClicked] = useState(false)


  // Generate orbital rings
  const orbitalRings = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      radius: size * (0.85 + i * 0.07), // Between inner (0.8) and outer (1.2) planets
      speed: 0.08 + i * 0.04, // Faster rotation
      particles: 8 + i * 4,
      color: ['#ff0066', '#00ff88', '#6600ff', '#ff8800', '#0088ff'][i]
    }))
  }, [size])

  // Smooth planet animation system
  useFrame((state) => {
    if (!planetRef.current) return

    const time = state.clock.elapsedTime
    const clickEffect = isClicked ? Math.sin(time * 10) * 0.1 + 1 : 1

    // Smooth planet rotation with click response
    planetRef.current.rotation.y = time * 0.1 * clickEffect
    planetRef.current.rotation.x = Math.sin(time * 0.3) * 0.05
    planetRef.current.rotation.z = Math.cos(time * 0.2) * 0.03

    // Animate orbital rings with blinking effect
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ringGroup, ringIndex) => {
        const ring = orbitalRings[ringIndex]
        if (!ring) return

        // Rotate the entire ring group
        ringGroup.rotation.y = time * ring.speed * clickEffect
        ringGroup.rotation.x = Math.sin(time * 0.5 + ringIndex) * 0.3
        ringGroup.rotation.z = Math.cos(time * 0.3 + ringIndex) * 0.2
        
        // Add blinking effect to each ring orientation within the group
        ringGroup.children.forEach((mesh, meshIndex) => {
          if ((mesh as THREE.Mesh).material) {
            const material = (mesh as THREE.Mesh).material as THREE.MeshBasicMaterial
            const baseOpacity = [0.3, 0.2, 0.18, 0.15, 0.12][meshIndex] || 0.2
            const blinkSpeed = 2 + meshIndex * 0.5 + ringIndex * 0.3
            const blinkOffset = meshIndex * 0.7 + ringIndex * 1.2
            
            // Create pulsing/blinking effect
            const blinkIntensity = Math.sin(time * blinkSpeed + blinkOffset) * 0.5 + 0.5
            material.opacity = baseOpacity + (blinkIntensity * baseOpacity * 0.8)
          }
        })
      })
    }



    // Animate core orbiting spheres
    if (coreOrbsRef.current && coreOrbsRef.current.children.length >= 2) {
      const coreRadius = size * 0.6 // Orbit inside the main planet
      const verticalOrb = coreOrbsRef.current.children[0]
      const horizontalOrb = coreOrbsRef.current.children[1]
      
      // Vertical orbiting sphere (YZ plane)
      const verticalSpeed = 1.5
      const verticalAngle = time * verticalSpeed
      verticalOrb.position.x = 0
      verticalOrb.position.y = Math.cos(verticalAngle) * coreRadius
      verticalOrb.position.z = Math.sin(verticalAngle) * coreRadius
      
      // Add glowing effect
      if ((verticalOrb as THREE.Mesh).material) {
        ((verticalOrb as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0.8 + Math.sin(time * 4) * 0.3
      }
      
      // Horizontal orbiting sphere (XZ plane)
      const horizontalSpeed = 1.2
      const horizontalAngle = time * horizontalSpeed
      horizontalOrb.position.x = Math.cos(horizontalAngle) * coreRadius
      horizontalOrb.position.y = 0
      horizontalOrb.position.z = Math.sin(horizontalAngle) * coreRadius
      
      // Add glowing effect with different phase
      if ((horizontalOrb as THREE.Mesh).material) {
        ((horizontalOrb as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0.8 + Math.sin(time * 4 + Math.PI) * 0.3
      }
    }

    // Animate horizontally orbiting clouds
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloudGroup, index) => {
        // Different speeds for different layers
        const cloudSpeed = 0.05 + (index % 4) * 0.02
        cloudGroup.rotation.y = time * cloudSpeed * clickEffect
        
        // Slight vertical bobbing for realism
        cloudGroup.position.y = Math.sin(time * 0.3 + index * 0.5) * 0.05
      })
    }

    // Click effect decay
    if (isClicked && time % 2 > 1.8) {
      setIsClicked(false)
    }
  })


  return (
    <group>
      {/* Transparent Wireframe Planet */}
      <mesh 
        ref={planetRef}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.15}
          wireframe={true}
        />
      </mesh>



      {/* Inner Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[size * 0.8, 16, 16]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.1}
          wireframe={true}
        />
      </mesh>

      {/* Outer Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[size * 1.2, 24, 24]} />
        <meshBasicMaterial
          color="#00FF88"
          transparent
          opacity={0.08}
          wireframe={true}
        />
      </mesh>

      {/* Orbital Ring Network */}
      <group ref={ringsRef}>
        {orbitalRings.map((ring, index) => (
          <group key={index}>
            {/* Horizontal rings (original) */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[ring.radius * 0.97, ring.radius * 1.03, 128]} />
              <meshBasicMaterial 
                color={ring.color} 
                transparent 
                opacity={0.3}
                wireframe={true}
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Vertical rings */}
            <mesh rotation={[0, 0, 0]}>
              <ringGeometry args={[ring.radius * 0.98, ring.radius * 1.02, 96]} />
              <meshBasicMaterial 
                color={ring.color} 
                transparent 
                opacity={0.2}
                wireframe={true}
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Diagonal rings - 45 degrees */}
            <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              <ringGeometry args={[ring.radius * 0.975, ring.radius * 1.025, 80]} />
              <meshBasicMaterial 
                color={ring.color} 
                transparent 
                opacity={0.18}
                wireframe={true}
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Diagonal rings - opposite direction */}
            <mesh rotation={[-Math.PI / 4, -Math.PI / 4, Math.PI / 3]}>
              <ringGeometry args={[ring.radius * 0.985, ring.radius * 1.015, 64]} />
              <meshBasicMaterial 
                color={ring.color} 
                transparent 
                opacity={0.15}
                wireframe={true}
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* Additional angled ring */}
            <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
              <ringGeometry args={[ring.radius * 0.99, ring.radius * 1.01, 72]} />
              <meshBasicMaterial 
                color={ring.color} 
                transparent 
                opacity={0.12}
                wireframe={true}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>




      {/* Core Orbiting Spheres */}
      <group ref={coreOrbsRef}>
        {/* Vertical orbiting sphere */}
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial
            color="#ffff88"
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Horizontal orbiting sphere */}
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial
            color="#ffff88"
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>


    </group>
  )
}

export default CyberpunkPlanet