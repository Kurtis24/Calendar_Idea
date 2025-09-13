import React, { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleSphere(props) {
  const meshRef = useRef()
  const particlesRef = useRef()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const { viewport } = useThree()
  
  // Generate particle positions on a sphere
  const particlePositions = useMemo(() => {
    const positions = []
    const colors = []
    const particleCount = 1500 // Adjust for performance vs quality
    
    for (let i = 0; i < particleCount; i++) {
      // Spherical coordinates
      const phi = Math.acos(-1 + (2 * i) / particleCount)
      const theta = Math.sqrt(particleCount * Math.PI) * phi
      
      // Convert to cartesian coordinates
      const radius = 2.0 // Increased from 1.2 to 2.0 for bigger sphere
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(theta) * Math.sin(phi)
      
      positions.push(x, y, z)
      
      // Create colorful particles like in your image
      const hue = (theta / (Math.PI * 2)) * 360 // Rainbow based on position
      const saturation = 0.8 + Math.random() * 0.2
      const lightness = 0.5 + Math.random() * 0.3
      
      const color = new THREE.Color().setHSL(hue / 360, saturation, lightness)
      colors.push(color.r, color.g, color.b)
    }
    
    return { positions: new Float32Array(positions), colors: new Float32Array(colors) }
  }, [])
  
  // Animate the sphere rotation based on mouse movement
  useFrame((state) => {
    if (particlesRef.current) {
      // Base gentle rotation
      particlesRef.current.rotation.y += 0.002
      
      // Mouse-controlled rotation - smooth and responsive
      const targetRotationY = state.mouse.x * Math.PI * 0.5
      const targetRotationX = -state.mouse.y * Math.PI * 0.3
      
      // Smooth interpolation for natural rotation
      particlesRef.current.rotation.y += (targetRotationY - particlesRef.current.rotation.y) * 0.05
      particlesRef.current.rotation.x += (targetRotationX - particlesRef.current.rotation.x) * 0.05
      
      // Keep sphere centered - no position movement
      particlesRef.current.position.x = 0
      particlesRef.current.position.y = 0
      
      // Add subtle floating animation on Z-axis only
      const time = state.clock.getElapsedTime()
      particlesRef.current.position.z = Math.sin(time * 0.5) * 0.05
    }
  })
  
  return (
    <group ref={meshRef} {...props}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.positions.length / 3}
            array={particlePositions.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particlePositions.colors.length / 3}
            array={particlePositions.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
