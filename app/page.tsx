import React from "react";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { FaHome } from "react-icons/fa";
import Contact from "@/components/Contact";
import Exploration from "@/components/Exploration";
import Planets from "@/components/Planets";
import DiscoverMore from "@/components/DiscoverMore";
import News from "@/components/News"; 
import Dwarfplanets from "@/components/Dwarfplanets";

const Home = () => {
  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden w-full min-h-screen">
      <div className="w-full">
        <FloatingNav
          navItems={[
            { name: 'Home', link: '/', icon: <FaHome /> }
          ]}
        />
        <Hero />
        <Exploration />
        <Planets />
        <Dwarfplanets />
        <DiscoverMore />
        <News />
        <Contact />

        
      </div>
    </main>
  );
};

export default Home;



