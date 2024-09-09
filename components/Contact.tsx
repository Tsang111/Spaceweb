"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Meteors } from "./ui/Meteors"; // Import Meteors component
import Button from "./ui/Button"; // Import Button component

// Sphere 3D Scene Component
const SphereScene = () => {
  const meshRef = useRef<THREE.Mesh>(null!); // Initialize meshRef correctly
  const { camera, gl } = useThree();

  // Define clockwise or anticlockwise rotation based on user interaction
  const [rotationDirection, setRotationDirection] = useState(1); // 1 for clockwise, -1 for anticlockwise

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = false; // Disable auto-rotate in OrbitControls to handle rotation manually

    let mouseDown = false;
    let rgb = [12, 23, 55];

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDown && meshRef.current) {
        rgb = [
          Math.round((e.pageX / window.innerWidth) * 255),
          Math.round((e.pageY / window.innerHeight) * 255),
          150,
        ];
      }
    };

    const handleMouseDown = () => (mouseDown = true);
    const handleMouseUp = () => (mouseDown = false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    // Animation for sphere scaling when page loads
    gsap.fromTo(
      meshRef.current.scale,
      { z: 0, x: 0, y: 0 },
      { z: 1, x: 1, y: 1, duration: 1.2, ease: "power2.out" }
    );

    // Clean up event listeners and controls
    return () => {
      controls.dispose();
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, gl]);

  useFrame(() => {
    if (meshRef.current) {
      // Apply smooth rotation based on direction
      meshRef.current.rotation.y += 0.002 * rotationDirection;
      meshRef.current.rotation.x += 0.0015 * rotationDirection;
    }
  });

  // Load texture
  const texture = new THREE.TextureLoader().load("/Texture.png");

  // Function to toggle rotation direction
  const toggleRotation = () => {
    setRotationDirection((prev) => prev * -1); // Toggle between clockwise and anticlockwise
  };

  return (
    <mesh
      ref={meshRef}
      geometry={new THREE.SphereGeometry(7, 32, 32)}
      onClick={toggleRotation} // Toggle rotation on click
    >
      <meshStandardMaterial map={texture} roughness={0.8} />
    </mesh>
  );
};

// Main Contact Component
const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_m9k0sp8",
        "template_csrrs9e",
        {
          from_name: "Visitor",
          to_name: "Tsang HL",
          from_email: form.email,
          to_email: "tsanghl1213@gmail.com",
          message: form.message,
        },
        "9NNI83_W-aKu-hlTz"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div id="contact" className="py-20 w-full flex flex-col items-center mt-60 relative">
      {/* Container for Contact Form and Sphere */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-16">
        {/* Contact Form on the left */}
        <div className="order-2 md:order-1 relative max-w-lg w-full mt-12 md:mt-0 mx-4 sm:mx-6 md:mx-6">
         {/* Margin with edge of sm,md,mg device */}
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#ff6f61] to-[#ff3c30] transform scale-[0.80] blur-3xl rounded-full"></div>
        {/* Gradient bg */}
     

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative shadow-xl bg-[#0b1b1b]/[0.5] border border-gray-600 p-10 overflow-hidden rounded-2xl flex flex-col items-center z-10"
            >{/* contact box colour */}
            <h2 className="text-3xl font-bold text-right text-white mb-8">Get in touch</h2>
            <label className="block mb-6 w-full">
              <span className="text-white">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="w-full px-4 py-3 mt-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </label>
            <label className="block mb-6 w-full">
              <span className="text-white">Your Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Any more ideas/comments"
                className="w-full px-4 py-3 mt-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                rows={5}
                required
              ></textarea>
            </label>

            {/* Import and use the Button component */}
            <Button loading={loading}>Send</Button>

            {/* Meteors effect inside the contact box */}
            <Meteors number={12} /> {/* More meteors for a stronger visual effect */}
          </form>
        </div>

        {/* 3D Sphere on the right */}
        <div className="order-1 md:order-2 w-full max-w-md md:mt-0">
          <Canvas style={{ height: "500px" }} camera={{ position: [0, 0, 24], fov: 45 }}>
            <Suspense fallback={null}>
              <SphereScene />
            </Suspense>
            <ambientLight intensity={1.4} /> {/* Increased ambient light for extra brightness */}
            <directionalLight position={[8, 5, 5]} intensity={0.7} /> {/* Increased directional light intensity */}
            <pointLight position={[0, 0, 12]} intensity={2} />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Contact;
