import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface DataNode {
  id: string
  position: [number, number, number]
  connections: string[]
  type: 'server' | 'client' | 'api' | 'database'
}

interface NetworkingVisualizerProps {
  planetRadius?: number
  showLabels?: boolean
}

const NetworkingVisualizer = ({ 
  planetRadius = 2.5, 
  showLabels = false 
}: NetworkingVisualizerProps) => {
  const networkRef = useRef<THREE.Group>(null)

  // Generate network topology
  const networkData = useMemo(() => {
    const nodes: DataNode[] = [
      // Core servers
      { id: 'core-1', position: [0, planetRadius + 0.5, 0], connections: ['api-1', 'api-2', 'db-1'], type: 'server' },
      { id: 'core-2', position: [0, -planetRadius - 0.5, 0], connections: ['api-3', 'api-4', 'db-2'], type: 'server' },

      // API nodes
      { id: 'api-1', position: [planetRadius + 1, 0, 0], connections: ['client-1', 'client-2'], type: 'api' },
      { id: 'api-2', position: [-planetRadius - 1, 0, 0], connections: ['client-3', 'client-4'], type: 'api' },
      { id: 'api-3', position: [0, 0, planetRadius + 1], connections: ['client-5', 'client-6'], type: 'api' },
      { id: 'api-4', position: [0, 0, -planetRadius - 1], connections: ['client-7', 'client-8'], type: 'api' },

      // Database nodes
      { id: 'db-1', position: [planetRadius + 0.7, planetRadius + 0.7, 0], connections: [], type: 'database' },
      { id: 'db-2', position: [-planetRadius - 0.7, -planetRadius - 0.7, 0], connections: [], type: 'database' },

      // Client nodes (distributed around)
      { id: 'client-1', position: [planetRadius + 1.5, 1, 0.5], connections: [], type: 'client' },
      { id: 'client-2', position: [planetRadius + 1.2, -0.8, -0.3], connections: [], type: 'client' },
      { id: 'client-3', position: [-planetRadius - 1.3, 0.9, 0.7], connections: [], type: 'client' },
      { id: 'client-4', position: [-planetRadius - 1.6, -1.1, -0.4], connections: [], type: 'client' },
      { id: 'client-5', position: [0.6, 0.3, planetRadius + 1.4], connections: [], type: 'client' },
      { id: 'client-6', position: [-0.4, -0.5, planetRadius + 1.7], connections: [], type: 'client' },
      { id: 'client-7', position: [0.8, 0.2, -planetRadius - 1.3], connections: [], type: 'client' },
      { id: 'client-8', position: [-0.6, -0.4, -planetRadius - 1.5], connections: [], type: 'client' },
    ]

    // Create connections array for rendering
    const connections: Array<{ from: [number, number, number], to: [number, number, number], activity: number }> = []

    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId)
        if (targetNode) {
          connections.push({
            from: node.position,
            to: targetNode.position,
            activity: 0.5
          })
        }
      })
    })

    return { nodes, connections }
  }, [planetRadius])

  // Animation loop
  useFrame((state) => {
    if (!networkRef.current) return

    const time = state.clock.elapsedTime

    // Gentle rotation
    networkRef.current.rotation.y = time * 0.1
    
    // Animate node activity (pulsing)
    networkRef.current.children.forEach((child) => {
      if (child.type === 'Group') {
        const scale = 1 + Math.sin(time * 2) * 0.15
        child.scale.setScalar(scale)
      }
    })
  })

  const getNodeColor = (type: string) => {
    const colors = {
      server: '#00D4FF',
      api: '#8B5CF6', 
      database: '#00FF88',
      client: '#F59E0B'
    }
    return colors[type as keyof typeof colors] || '#FFFFFF'
  }

  const getNodeSize = (type: string) => {
    const sizes = {
      server: 0.08,
      api: 0.06,
      database: 0.07,
      client: 0.04
    }
    return sizes[type as keyof typeof sizes] || 0.05
  }

  // Custom Line component using BufferGeometry
  const ConnectionLine = ({ from, to, opacity }: { from: [number, number, number], to: [number, number, number], opacity: number }) => {
    const geometry = useMemo(() => {
      const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)]
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      return geo
    }, [from, to])

    return (
      <line>
        <bufferGeometry attach="geometry" {...geometry} />
        <lineBasicMaterial attach="material" color="#00D4FF" transparent opacity={opacity} />
      </line>
    )
  }

  return (
    <group ref={networkRef}>
      {/* Render Nodes */}
      {networkData.nodes.map((node) => (
        <group key={node.id} position={node.position}>
          {/* Main Node Sphere */}
          <mesh>
            <sphereGeometry args={[getNodeSize(node.type), 16, 16]} />
            <meshStandardMaterial
              color={getNodeColor(node.type)}
              emissive={getNodeColor(node.type)}
              emissiveIntensity={0.4}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Node Glow Effect */}
          <mesh>
            <sphereGeometry args={[getNodeSize(node.type) * 2, 16, 16]} />
            <meshBasicMaterial
              color={getNodeColor(node.type)}
              transparent
              opacity={0.1}
            />
          </mesh>

          {/* Activity Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[getNodeSize(node.type) * 1.5, getNodeSize(node.type) * 2, 16]} />
            <meshBasicMaterial
              color={getNodeColor(node.type)}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Node Type Indicator */}
          {node.type === 'server' && (
            <mesh position={[0, getNodeSize(node.type) + 0.05, 0]}>
              <boxGeometry args={[0.02, 0.06, 0.02]} />
              <meshBasicMaterial color="#00D4FF" />
            </mesh>
          )}

          {/* Labels */}
          {showLabels && (
            <Text
              position={[0, getNodeSize(node.type) + 0.2, 0]}
              fontSize={0.1}
              color={getNodeColor(node.type)}
              anchorX="center"
              anchorY="middle"
            >
              {node.type.toUpperCase()}
            </Text>
          )}
        </group>
      ))}

      {/* Render Connections */}
      {networkData.connections.map((connection, index) => (
        <group key={index}>
          {/* Main Connection Line */}
          <ConnectionLine 
            from={connection.from}
            to={connection.to}
            opacity={0.3 + connection.activity * 0.4}
          />

          {/* Data Flow Animation */}
          <mesh position={[
            (connection.from[0] + connection.to[0]) / 2,
            (connection.from[1] + connection.to[1]) / 2,
            (connection.from[2] + connection.to[2]) / 2,
          ]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial
              color="#00FF88"
              transparent
              opacity={connection.activity}
            />
          </mesh>
        </group>
      ))}

      {/* Data Stream Particles */}
      {Array.from({ length: 20 }).map((_, index) => {
        const angle = (index / 20) * Math.PI * 2
        const radius = planetRadius + 0.8 + Math.sin(index) * 0.3
        
        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * radius,
              Math.sin(index * 0.5) * 0.5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial
              color="#8B5CF6"
              transparent
              opacity={0.6}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default NetworkingVisualizer