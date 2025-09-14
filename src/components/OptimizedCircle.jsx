import React from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function OptimizedEarth(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/circle.gltf')
  const { actions } = useAnimations(animations, group)
  
  // Only play the first few animations to reduce lag
  React.useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions)
      // Only play first 3 animations instead of all of them
      actionKeys.slice(0, 3).forEach(key => {
        const action = actions[key]
        if (action) {
          action.setEffectiveTimeScale(0.5) // Slower animation
          action.play()
        }
      })
    }
  }, [actions])

  // Add gentle rotation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.002
    }
  })
  
  return (
    <group ref={group} {...props} dispose={null} scale={0.3}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="sketchfabtimeframe">
            {/* Only render first 10 frames for performance */}
            <group name="Object_2" scale={1}>
              <group name="frame_2829">
                <points name="Object_4" geometry={nodes.Object_4?.geometry} material={materials.material_0} />
              </group>
            </group>
            <group name="Object_5" scale={1}>
              <group name="frame_2828">
                <points name="Object_7" geometry={nodes.Object_7?.geometry} material={materials.material_0} />
              </group>
            </group>
            <group name="Object_8" scale={1}>
              <group name="frame_2827">
                <points name="Object_10" geometry={nodes.Object_10?.geometry} material={materials.material_0} />
              </group>
            </group>
            <group name="Object_11" scale={1}>
              <group name="frame_2826">
                <points name="Object_13" geometry={nodes.Object_13?.geometry} material={materials.material_0} />
              </group>
            </group>
            <group name="Object_14" scale={1}>
              <group name="frame_2825">
                <points name="Object_16" geometry={nodes.Object_16?.geometry} material={materials.material_0} />
              </group>
            </group>
            <group name="Object_17" scale={1}>
              <group name="frame_2824">
                <points name="Object_19" geometry={nodes.Object_19?.geometry} material={materials.material_0} />
              </group>
            </group>
            <group name="Object_20" scale={1}>
              <group name="frame_2823">
                <points name="Object_22" geometry={nodes.Object_22?.geometry} material={materials.material_0} />
              </group>
            </group>
            <group name="Object_23" scale={1}>
              <group name="frame_2822">
                <points name="Object_25" geometry={nodes.Object_25?.geometry} material={materials.material_0} />
              </group>
            </group>
            <group name="Object_26" scale={1}>
              <group name="frame_2821">
                <points name="Object_28" geometry={nodes.Object_28?.geometry} material={materials.material_0} />
              </group>
            </group>
            <group name="Object_29" scale={1}>
              <group name="frame_2820">
                <points name="Object_31" geometry={nodes.Object_31?.geometry} material={materials.material_0} />
              </group>
            </group>
            
            {/* Skip the rest of the 2000+ frames for performance */}
            {/* All other groups are not rendered to improve performance */}
          </group>
        </group>
      </group>
    </group>
  )
}

// Preload the model
useGLTF.preload('/circle.gltf')



