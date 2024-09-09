import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const MoonWalk = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/MoonWalk.glb');
  const { actions } = useAnimations(animations, group);

  // Optional: You can add animation control or other effects here using useFrame or useEffect

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.002}>
          <group name="af6fd5bcfee840118e90dbb034537f35fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Armature"
                  position={[0, 280.051, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_85"
                      geometry={nodes.Object_85.geometry}
                      material={materials.suit_diff_MAT}
                      skeleton={nodes.Object_85.skeleton}
                    />
                    <group name="Object_84" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                  </group>
                </group>
                <group name="Retopo_Suit" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/models/MoonWalk.glb');

export default MoonWalk;

