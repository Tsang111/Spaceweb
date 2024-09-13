"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PinContainer } from "@/components/ui/3d-pin";
import * as THREE from "three";
import { Html } from "@react-three/drei"; // Import Html from drei

const planets = [
  {
    title: "Ceres",
    description:
      "Ceres is the largest object in the asteroid belt between Mars and Jupiter, classified as a dwarf planet. It is unique for its potential to harbour water ice and possibly conditions for life.",
    link: "https://science.nasa.gov/dwarf-planets/ceres/",
    textureUrl: "/ceres.png",
  },
  {
    title: "Makemake",
    description:
      "Makemake is a distant dwarf planet in the Kuiper Belt. It is known for being the second-brightest object in that region. It was discovered in 2005 and is named after the Rapanui god of fertility.",
    link: "https://science.nasa.gov/dwarf-planets/makemake/",
    textureUrl: "/makemake.png",
  },
  {
    title: "Haumea",
    description:
      "Haumea is a unique dwarf planet in the Kuiper Belt, distinguished by its elongated shape and rapid rotation. It has a system of at least two moons and is named after the Hawaiian goddess of fertility and childbirth.",
    link: "https://science.nasa.gov/dwarf-planets/haumea/",
    textureUrl: "/haumea.png",
  },
  {
    title: "Eris",
    description:
      "Eris is one of the largest known dwarf planets, located in the scattered disc of the outer solar system. Discovered in 2005, it contributed to redefining what constitutes a planet.",
    link: "https://science.nasa.gov/dwarf-planets/eris/",
    textureUrl: "/eris.png",
  },
  {
    title: "Pluto",
    description:
      "Pluto, once considered the ninth planet, is now classified as a dwarf planet in the Kuiper Belt. It has five known moons, with Charon being the largest, and its reclassification sparked significant debate within the astronomical community.",
    link: "https://science.nasa.gov/dwarf-planets/pluto/",
    textureUrl: "/pluto.png",
  },
];

const PlanetModel = ({ textureUrl }: { textureUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0015;
      meshRef.current.rotation.x += 0.0015;
      meshRef.current.rotation.z += 0.0015;
    }
  });

  return (
    <mesh ref={meshRef}> {/* Adjusted scale */}
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={new THREE.TextureLoader().load(textureUrl)} />
    </mesh>
  );
};

const DwarfPlanets = () => {
  return (
    <div id="planets" className="w-full font-bold md:px-20 py-10 mt-10">
      <div className="max-w-7xl mx-auto mt-20">
        <h2 className="text-2xl md:text-5xl mb-2 text-white max-w-4xl ml-10">
          Dwarf Planets
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {planets.map((planet) => (
            <PinContainer
              key={planet.title}
              title={planet.title}
              href={planet.link}
              containerClassName="w-[20rem] h-[30rem] mx-4 my-8"
            >
              <div className="relative w-full h-full p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-600 dark:text-white">
                    {planet.title}
                  </h3>
                  <p className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    {planet.description}
                  </p>
                </div>
                <div className="relative w-full h-[300px] mt-4 flex items-center justify-center">
                  <Canvas camera={{ position: [0, 0, 5], fov: 70 }} style={{ height: '150px', width: '100%' }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} />
                    <PlanetModel textureUrl={planet.textureUrl} />
                    <Html position={[0, 0, 0]} transform>
                      {/* Place HTML elements here if needed */}
                    </Html>
                  </Canvas>
                </div>
              </div>
            </PinContainer>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DwarfPlanets;
