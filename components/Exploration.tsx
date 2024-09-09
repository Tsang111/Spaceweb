"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Timeline } from "@/components/ui/Timeline";
import MoonWalk from './ui/MoonWalk'; // Adjust the path as necessary
import { Leva } from "leva";
import { OrbitControls } from '@react-three/drei';

export default function Exploration() {
  // Function to calculate sizes based on screen size
  function calculateSizes(isSmall, isMobile, isTablet) {
    if (isSmall) {
      return {
        deskPosition: [0, -2, 0],
        deskScale: 2.0,
      };
    } else if (isMobile) {
      return {
        deskPosition: [0, -3, 0],
        deskScale: 3.0,
      };
    } else if (isTablet) {
      return {
        deskPosition: [0, -3.5, 0],
        deskScale: 7.5,
      };
    }
    return {
      deskPosition: [0, -4, 0],
      deskScale: 8.0,
    };
  }

  // Media queries to determine screen size
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  // Calculate sizes for MoonWalk model
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Timeline data
  const data = [
    {
      title: "1940s-1970s",
      content: (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base lg:text-lg font-normal mb-20">
          <strong>Early Rockets and the Space Race</strong> <br />
          Development of rocketry led to major milestones like the launch of Sputnik 1 (1957), Yuri Gagarin&apos;s first human spaceflight (1961), and the Apollo 11 Moon landing (1969).
        </p>
      ),
    },
    {
      title: "1980s-2011",
      content: (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base lg:text-lg font-normal mb-20">
          <strong>Space Shuttle Era</strong> <br />
          Introduction of reusable spacecraft, significant missions, and the construction of the International Space Station.
        </p>
      ),
    },
    {
      title: "1970s-Present",
      content: (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base lg:text-lg font-normal mb-20">
          <strong>Robotic Exploration</strong> <br />
          Voyagers explored outer planets, Mars rovers like Curiosity and Perseverance advanced our knowledge of Mars, and the Hubble Space Telescope revolutionized astronomy.
        </p>
      ),
    },
    {
      title: "2000s-Present",
      content: (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base lg:text-lg font-normal mb-20">
          <strong>Rise of Private Space Companies</strong> <br />
          Companies like SpaceX and Blue Origin lowered costs and increased access to space, pioneering commercial space travel.
        </p>
      ),
    },
    {
      title: "2020s and Beyond",
      content: (
        <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base lg:text-lg font-normal mb-20">
          <strong>Modern and Future Missions</strong> <br />
          Ongoing efforts include the Artemis program to return humans to the Moon, Mars exploration missions, and advancements in space tourism.
        </p>
      ),
    },
  ];

  return (
    <div id="exploration" className="w-full">
      <Timeline data={data} />
      <div className="w-full h-96 mt-40">
        <Canvas>
          <Suspense fallback={<div>Loading 3D Model...</div>}>
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 25]} />
            <OrbitControls
              enableDamping={true}
              dampingFactor={0.05}
              enableZoom={false}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={1.5}
            />
            <MoonWalk position={sizes.deskPosition} scale={sizes.deskScale} />
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}