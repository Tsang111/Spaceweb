"use client";
import React from "react";
import { HoverEffect } from "./ui/Card-hover-effect"; 


const DiscoverMore = () => {
  return (
    <div id="discover more" className="w-full font-bold md:px-10 py-20">
      <div className="max-w-7xl mx-auto mt-20">
        {/* Title for the section */}
        <h2 className="text-2xl md:text-5xl mb-2 text-white max-w-4xl ml-10">
          Discover More
        </h2>
        {/* Component to display hover effect cards */}
        <CardHoverEffectDemo />
      </div>
    </div>
  );
};

// Component that renders the hover effect cards
export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8 mt-10">
      {/* HoverEffect component takes an array of items to display */}
      <HoverEffect items={projects} />
    </div>
  );
}

// Array containing the information for each card
export const projects = [
  {
    title: "Stars",
    description:
      "Stars are colossal spheres of hot gas, primarily hydrogen and helium, that illuminate our universe. They undergo nuclear fusion, producing energy that sustains their brightness for millions to billions of years. Stars form the backbone of galaxies and influence cosmic evolution.",
    link: "https://science.nasa.gov/universe/stars/",
  },
  {
    title: "Black Holes",
    description:
      "Black holes are some of the most enigmatic objects in the universe. They are characterized by their immense gravitational pull, which means nothing, not even light, can escape. Formed from the remnants of massive stars, black holes challenge our understanding of physics and remain a focal point of astronomical research.",
    link: "https://science.nasa.gov/universe/black-holes/",
  },
  {
    title: "Exoplanets",
    description:
      "Exoplanets, or planets outside our solar system, are diverse in composition and characteristics, with over 5,600 confirmed. They range from rocky worlds to gas giants, some even located in the habitable zones of their stars, raising intriguing possibilities for life beyond Earth.",
    link: "https://science.nasa.gov/exoplanets/",
  },
  {
    title: "Universe",
    description:
      "The universe is an expansive cosmos filled with countless stars, galaxies, and celestial phenomena. Understanding its origins, structure, and the forces that govern it is a central pursuit of modern astrophysics, revealing the mysteries of space and time.",
    link: "https://science.nasa.gov/universe/",
  },
  {
    title: "Galaxies",
    description:
      "Galaxies are vast collections of stars, gas, dust, and dark matter bound together by gravity. They come in various shapes and sizes, from spirals to ellipticals, and are essential for understanding the universe's history and the formation of cosmic structures.",
    link: "https://science.nasa.gov/universe/galaxies/",
  },
  {
    title: "The Sun",
    description:
      "The Sun is a medium-sized star at the centre of our solar system, providing the necessary energy for life on Earth. Its nuclear fusion reactions produce light and heat, influencing weather patterns and climate while playing a critical role in the solar system's dynamics.",
    link: "https://science.nasa.gov/sun/",
  },
];

export default DiscoverMore;
