import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Torus, Dodecahedron, Cylinder, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

interface ServiceIcon3DProps {
  type: string
  color: string
  animation: 'float' | 'rotate' | 'pulse' | 'none'
}

const ServiceIcon3D = ({ type, color, animation }: ServiceIcon3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return

    switch (animation) {
      case 'float':
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3
        meshRef.current.rotation.y += delta * 0.5
        break
      case 'rotate':
        meshRef.current.rotation.x += delta * 0.5
        meshRef.current.rotation.y += delta * 0.3
        meshRef.current.rotation.z += delta * 0.2
        break
      case 'pulse':
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
        meshRef.current.scale.setScalar(scale)
        meshRef.current.rotation.y += delta * 0.2
        break
      default:
        meshRef.current.rotation.y += delta * 0.2
        break
    }
  })

  const renderGeometry = () => {
    const props = { ref: meshRef }
    
    switch (type) {
      case 'saas':
        return (
          <group>
            <Box {...props} args={[1.2, 1.2, 0.2]} position={[0, 0.3, 0]} />
            <Box args={[1, 1, 0.15]} position={[0, 0, 0]} />
            <Box args={[0.8, 0.8, 0.1]} position={[0, -0.3, 0]} />
          </group>
        )
      case 'web':
        return (
          <group>
            <Cylinder args={[1.2, 1.2, 0.1, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} />
            <Sphere {...props} args={[0.6, 32, 32]} />
          </group>
        )
      case 'mobile':
        return (
          <group>
            <Box {...props} args={[0.7, 1.4, 0.1]} />
            <Box args={[0.6, 0.1, 0.05]} position={[0, 0.6, 0.06]} />
            <Sphere args={[0.05, 16, 16]} position={[0, -0.6, 0.06]} />
          </group>
        )
      case 'api':
        return (
          <group>
            <Torus {...props} args={[0.8, 0.2, 16, 32]} />
            <Torus args={[0.5, 0.1, 8, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <Sphere args={[0.1, 8, 8]} position={[0.8, 0, 0]} />
            <Sphere args={[0.1, 8, 8]} position={[-0.8, 0, 0]} />
            <Sphere args={[0.1, 8, 8]} position={[0, 0.8, 0]} />
            <Sphere args={[0.1, 8, 8]} position={[0, -0.8, 0]} />
          </group>
        )
      case 'cloud':
        return (
          <group>
            <Sphere {...props} args={[0.6, 16, 16]} position={[0, 0.2, 0]} />
            <Sphere args={[0.5, 16, 16]} position={[-0.4, 0, 0]} />
            <Sphere args={[0.5, 16, 16]} position={[0.4, 0, 0]} />
            <Sphere args={[0.4, 16, 16]} position={[0.2, -0.2, 0]} />
            <Sphere args={[0.3, 16, 16]} position={[-0.2, -0.2, 0]} />
          </group>
        )
      case 'transformation':
        return (
          <group>
            <Octahedron {...props} args={[0.8]} />
            <Torus args={[1.2, 0.1, 8, 32]} rotation={[Math.PI / 4, 0, 0]} />
            <Torus args={[1.2, 0.1, 8, 32]} rotation={[-Math.PI / 4, 0, Math.PI / 2]} />
          </group>
        )
      default:
        return <Dodecahedron {...props} args={[0.8]} />
    }
  }

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color={color} />
      
      {renderGeometry()}
      
      <meshStandardMaterial 
        color={color}
        metalness={0.7}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </group>
  )
}

export default ServiceIcon3D