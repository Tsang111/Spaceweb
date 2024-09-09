"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"; // Adjust the path if necessary
import Link from "next/link";
import * as THREE from "three";


// Component to render individual 3D models for each planet
const PlanetModel = ({ textureUrl }: { textureUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Apply smooth rotation
      meshRef.current.rotation.y += 0.0015;
      meshRef.current.rotation.x += 0.0015;
      meshRef.current.rotation.z += 0.0015;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Sphere geometry for the planet model */}
      <sphereGeometry args={[2.5, 32, 32]} />
      {/* Apply texture to the model */}
      <meshStandardMaterial map={new THREE.TextureLoader().load(textureUrl)} />
    </mesh>
  );
};

const ThreeDCard = ({ title, description, textureUrl, link }: { title: string; description: string; textureUrl: string; link: string }) => (
  <CardContainer className="inter-var">
    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full max-w-[20rem] h-[30rem] rounded-xl p-6 border flex flex-col justify-between">
      <div className="text-left">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
      </div>
      <div className="flex justify-center items-center my-4">
        <div className="relative w-[150px] h-[150px]">
          {/* Wrapping the Canvas with FollowingPointer */}
          
            <Canvas className="absolute inset-0">
              {/* Lighting for the 3D model */}
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} />
              {/* Render the 3D planet model */}
              <PlanetModel textureUrl={textureUrl} />
            </Canvas>
          
        </div>
      </div>
      <div className="flex justify-center items-center mt-2">
        <CardItem
          translateZ={20}
          as={Link}
          href={link}
          target="__blank"
          className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
        >
          Learn more →
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
);

// Planets component rendering all the 3D cards
const Planets = () => {
  const planets = [
    {
      title: "Mercury",
      description:
        "Mercury is the closest planet to the Sun, with a surface marked by craters and extreme temperature fluctuations. It has no atmosphere, resulting in temperatures ranging from scorching hot to cold.",
      textureUrl: "/MercuryTexture.png",
      link: "https://science.nasa.gov/mercury/",
    },
    {
      title: "Venus",
      description:
        "Venus is often called Earth's 'sister planet' due to its similar size and composition. However, it has a thick, toxic atmosphere primarily composed of carbon dioxide. Its extremely high surface temperatures make it the hottest planet in the solar system.",
      textureUrl: "/VenusTexture.png",
      link: "https://science.nasa.gov/venus/",
    },
    {
      title: "Earth",
      description:
        "Earth is the third planet from the Sun and the only known planet to support life, thanks to its liquid water and protective atmosphere. It has diverse ecosystems and a moderate climate, allowing for various habitats.",
      textureUrl: "/EarthTexture.png",
      link: "https://science.nasa.gov/earth/",
    },
    {
      title: "Mars",
      description:
        "Mars, known as the 'Red Planet,' has a thin atmosphere and surface features reminiscent of the Moon and Earth, including valleys, deserts, and polar ice caps. It is a focus on the exploration of potential past life and human colonisation.",
      textureUrl: "/MarsTexture.png",
      link: "https://science.nasa.gov/mars/",
    },
    {
      title: "Jupiter",
      description:
        "Jupiter is the largest planet in our solar system, known for its Great Red Spot, a giant storm larger than Earth. It has a thick hydrogen and helium atmosphere and a strong magnetic field with many moons, including Ganymede, the largest moon.",
      textureUrl: "/JupiterTexture.png",
      link: "https://science.nasa.gov/jupiter/",
    },
    {
      title: "Saturn",
      description:
        "Saturn is famous for its stunning rings of ice and rock particles, making it one of the most recognisable planets. It is a gas giant with a composition similar to Jupiter, primarily made of hydrogen and helium.",
      textureUrl: "/SaturnTexture.png",
      link: "https://science.nasa.gov/saturn/",
    },
    {
      title: "Uranus",
      description:
        "Uranus is unique for its blue-green color due to methane in its atmosphere and its extreme tilt, which causes it to rotate on its side. It is an ice giant with a faint ring system and numerous moons.",
      textureUrl: "/UranusTexture.png",
      link: "https://science.nasa.gov/uranus/",
    },
    {
      title: "Neptune",
      description:
        "Neptune, the farthest planet from the Sun, is known for its deep blue colour and strong winds, making it the windiest planet in the solar system. It has a dynamic atmosphere with storms and a faint ring system.",
      textureUrl: "/NeptuneTexture.png",
      link: "https://science.nasa.gov/neptune/",
    },
  ];

  return (
    <div id="planets" className="w-full font-bold md:px-20 py-10 mt-20">
      <div className="max-w-7xl mx-auto mt-20">
        <h2 className="text-2xl md:text-5xl mb-2 text-white max-w-4xl ml-10">
          Planets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
          {planets.map((planet) => (
            <ThreeDCard
              key={planet.title}
              title={planet.title}
              description={planet.description}
              textureUrl={planet.textureUrl}
              link={planet.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planets;
