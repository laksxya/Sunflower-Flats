import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Particle() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#1a1a2e", // Deep dark blue background
          },
        },
        fpsLimit: 60, // Smooth animation
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push", // Adds particles on click
            },
            onHover: {
              enable: true,
              mode: "repulse", // Repels particles on hover
            },
            resize: true, // Ensures responsiveness
          },
          modes: {
            push: {
              quantity: 4, // Number of particles added on click
            },
            repulse: {
              distance: 150, // Repulsion distance
              duration: 0.4, // Repulsion duration
            },
          },
        },
        particles: {
          color: {
            value: ["#ff6b6b", "#48dbfb", "#1dd1a1", "#feca57", "#5f27cd"], // Vibrant multi-color particles
          },
          links: {
            color: "#ffffff", // White links for better contrast
            distance: 120, // Distance between linked particles
            enable: true,
            opacity: 0.4, // Link opacity
            width: 1.5, // Link width
          },
          collisions: {
            enable: true, // Particles collide with each other
          },
          move: {
            direction: "none", // Random movement
            enable: true,
            outModes: {
              default: "bounce", // Particles bounce off edges
            },
            random: true, // Random movement
            speed: 3, // Particle movement speed
            straight: false, // No straight-line movement
          },
          number: {
            density: {
              enable: true,
              area: 800, // Particle density area
            },
            value: 100, // Number of particles
          },
          opacity: {
            value: 0.8, // Particle opacity
            random: true, // Random opacity for depth
          },
          shape: {
            type: ["circle", "triangle"], // Circle and triangle shapes
          },
          size: {
            value: { min: 2, max: 6 }, // Particle size range
            random: true, // Random sizes for variety
          },
        },
        detectRetina: true, // High-resolution support
      }}
    />
  );
}

export default Particle;
