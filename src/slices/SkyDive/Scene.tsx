"use client";

import FloatingCan from "@/components/FloatingCan";
import {
  Cloud,
  Clouds,
  Environment,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { use, useRef } from "react";
import * as THREE from "three";
import { Content } from "@prismicio/client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { get } from "http";
import { PointLight } from "three";

type SkyDiveProps = {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Scene({ sentence, flavor }: SkyDiveProps) {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = (75 * Math.PI) / 180;

  const getXPosition = (distance: number) => {
    return distance * Math.cos(ANGLE);
  };
  const getYPosition = (distance: number) => {
    return distance * Math.sin(ANGLE);
  };

  const getXYPosition = (distance: number) => {
    return {
      x: getXPosition(distance),
      y: getYPosition(-1 * distance),
    };
  };

  /*  animation */
  useGSAP(() => {
    if (
      !cloudsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current ||
      !groupRef.current ||
      !canRef.current ||
      !wordsRef.current
    ) {
      return;
    }

    // set starting positions
    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, { ...getXYPosition(-4) });

    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      {
        ...getXYPosition(-7),
        z: 2,
      },
    );

    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    // infinite clouds movement
    const DISTANCE = 15;
    const DURATION = 6;

    gsap.to(cloudsRef.current.position, { ...getXYPosition(DISTANCE) });
    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      duration: DURATION,
      repeat: -1,
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      duration: DURATION,
      repeat: -1,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      duration: DURATION,
      delay: DURATION / 2,
      repeat: -1,
    });

    const scrolltl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sky-dive",
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
        pin: true,
      },
    });

    scrolltl
      .to("body", {
        backgroundColor: "#c9e68c",
        overwrite: "auto",
        duration: 0.1,
      })
      .to(cloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
      .to(
        canRef.current.position,
        { x: 0, y: 0, z: 0, duration: 1, ease: "sine.out" },
        0,
      )
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 1.5, y: -3, z: -2 },
            { ...getXYPosition(-10), z: -13 },
          ],
          stagger: 0.3,
          duration: 1.5,
        },
        0,
      )
      .to(canRef.current.position, {
        ...getXYPosition(4),
        duration: 1.5,
        ease: "sine.out",
      })
      .to(cloudsRef.current.position, { z: 7, duration: 1.5 });
  });
  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          ref={canRef}
          floatSpeed={3}
          flavor={flavor}
          rotationIntensity={0}
          floatIntensity={1}
        >
          <pointLight intensity={30} color="#0fa68d" decay={0.6} />
        </FloatingCan>
      </group>
      <Clouds material={THREE.MeshBasicMaterial} ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} color="orange" />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} color="gray" />
      </Clouds>
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="blue" />}
      </group>
      <ambientLight intensity={0.5} color="9DDEFA" />
      <Environment files={["/hdrs/field.hdr"]}></Environment>
    </group>
  );
}

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string | null;
  color?: string;
}) {
  const words = sentence?.toUpperCase().split(" ");

  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return words?.map((word, index) => {
    return (
      <Text
        scale={isDesktop ? 1 : 0.5}
        material={material}
        font="/fonts/Alpino-Variable.woff"
        fontWeight={900}
        anchorX={"center"}
        anchorY={"middle"}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXY!,.?"
        key={`${index} - ${word}`}
      >
        {word}
      </Text>
    );
  });
}
