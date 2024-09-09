"use client";

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import Astronaut from './ui/Astronaut'; // Ensure correct casing in the file name
import CanvasLoader from './ui/CanvasLoader';
import { FloatingNav } from "./ui/FloatingNavbar";
import { useMediaQuery } from 'react-responsive';
import { Leva } from 'leva';
import { OrbitControls } from '@react-three/drei';


// Function to calculate sizes based on device screen
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
      deskScale: 4.0,
    };
  }
  return {
    deskPosition: [0, -4, 0],
    deskScale: 5.0,
  };
}

// Component for rotating the astronaut model
const RotatingAstronaut = ({ position, rotation, scale }) => {
  const astronautRef = useRef();

  return (
    <Astronaut
      ref={astronautRef} 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isSmall = useMediaQuery({ maxWidth: 440 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  // Define navigation items
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Exploration", link: "#exploration" },
    { name: "Planets", link: "#planets" },
    { name: "Discover More", link: "#discover-more" },
    { name: "News", link: "#news" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-[1px]"
        style={{
          backgroundImage: `url('/Star.png')`,
          backgroundSize: 'cover',
          filter: 'brightness(1.5)', // Increase brightness
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>
      <FloatingNav navItems={navItems} />

      {/* Main content section */}
      <section className="min-h-screen w-full flex flex-col relative">
        <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-10">
          <p className="sm:text-3xl text-xl font-bold text-white text-center font-generalsans">
            Explore the Wonders of the Cosmos <span role="img" aria-label="earth">🌎</span>
          </p>
          <p className="hero_tag text-gray_gradient text-center">
            From the Timeline of Exploration to the Wonders of Planets and Beyond, Discover Space News.
          </p>
        </div>

        <div className="w-full h-full absolute inset-0">
          <Canvas className="w-full h-full">
            <Suspense fallback={<CanvasLoader />}>
              <Leva hidden />
              <PerspectiveCamera makeDefault position={[0, 0, 15]} />
              <OrbitControls
                enableDamping={true}
                dampingFactor={0.05}
                enableZoom={false}
                enablePan={false}
                />
              <RotatingAstronaut
                position={sizes.deskPosition}
                rotation={[0, 0, 0]}
                scale={sizes.deskScale}
              />
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 10]} intensity={0.5} />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </div>
  );
};

export default Hero;