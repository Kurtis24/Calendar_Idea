'use client'

import React, { useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState, memo } from "react";
import { loadLightInteraction } from "@tsparticles/interaction-light";

const ParticleBackground = memo(() => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadLightInteraction(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      light: {
        enable: true,
        area: {
          gradient: {
            start: { value: "#ffffff" },
            stop: { value: "#000000" },
          },
          radius: 1000,
        },
        shadow: {
          color: { value: "#000000" },
          length: 2000,
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: false,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: "top",
          enable: true,
          outModes: {
            default: "destroy",
          },
          random: true,
          speed: 1,
          straight: false,
          attract: {
            enable: true,
            rotate: {
              x: 600,
              y: 1200,
            },
          },
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 1.5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return <Particles id="tsparticles" options={particleOptions} />;
  }

  return <></>
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;

