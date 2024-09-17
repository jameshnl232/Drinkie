"use client";

import FloatingCan from "@/components/FloatingCan";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

export default function Scene({}: Props) {
  const isReady = useStore((state) => state.isReady);

  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 3;

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    //set can starting location

    gsap.set(can1Ref.current.position, { x: -2.5, y: 0.5, z: -2 });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });
    gsap.set(can2Ref.current.position, { x: 1.5, y: 0.3, z: 1 });
    gsap.set(can2Ref.current.rotation, { z: 0.5 });
    gsap.set(can3Ref.current.position, { y: 5, z: 1 });
    gsap.set(can4Ref.current.position, { x: 2, y: 5, z: -1 });
    gsap.set(can5Ref.current.position, { x: -2, y: 5, z: 2 });

    const tl = gsap.timeline({
      defaults: { duration: 3, ease: "back.out(1.7)" },
    });

    if (window.scrollY < 20) {
      tl.from(can1Ref.current.position, { y: 5, duration: 1 }, 0)
        .from(can1Ref.current.rotation, { y: 5, duration: 1 }, 0)

        .from(can2Ref.current.position, { y: 5, duration: 1 }, 0)
        .from(can2Ref.current.rotation, { y: 5, duration: 1 }, 0);
    }

    const scrollTl = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      //rotate cans group
      .to(groupRef.current.rotation, { y: Math.PI * 2, ease: "none" }, 0)

      //can 1
      .to(can1Ref.current.position, { x: -0.4, y: 0.5, z: -2, ease: "none" }, 0)
      .to(can1Ref.current.rotation, { z: 0.1, ease: "none" }, 0)

      //can 2
      .to(can2Ref.current.position, { x: 1, z: -0.5, y: -1, ease: "none" }, 0)
      .to(can2Ref.current.rotation, { x: 0.1, ease: "none" }, 0)

      //can 3
      .to(
        can3Ref.current.position,
        { x: -0.3, z: 0.2, y: -0.3, ease: "none" },
        0,
      )
      .to(can3Ref.current.rotation, { y: 0.1, ease: "none" }, 0)

      //can 4
      .to(
        can4Ref.current.position,
        { x: 0.8, z: -0.5, y: 0.7, ease: "none" },
        0,
      )
      .to(can4Ref.current.rotation, { z: -0.2, ease: "none" }, 0)

      //can 5
      .to(can5Ref.current.position, { x: -2.2, z: 1, y: -0.8, ease: "none" }, 0)
      .to(can5Ref.current.rotation, { z: -0.5, ease: "none" }, 0)

      .to(
        groupRef.current.position,
        { x: 1, ease: "sine.inOut", duration: 3 },
        1.3,
      );
  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          flavor="lemonLime"
          floatSpeed={FLOAT_SPEED}
          floatIntensity={1}
          rotationIntensity={2}
          floatingRange={[-0.1, 0.1]}
        />
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2Ref}
          flavor="grape"
          floatSpeed={FLOAT_SPEED}
          floatIntensity={1}
          rotationIntensity={2}
          floatingRange={[-0.1, 0.1]}
        />
      </group>
      <FloatingCan
        ref={can3Ref}
        flavor="blackCherry"
        floatSpeed={FLOAT_SPEED}
        floatIntensity={1}
        rotationIntensity={2}
        floatingRange={[-0.1, 0.1]}
      />
      <FloatingCan
        ref={can4Ref}
        flavor="strawberryLemonade"
        floatSpeed={FLOAT_SPEED}
        floatIntensity={1}
        rotationIntensity={2}
        floatingRange={[-0.1, 0.1]}
      />
      <FloatingCan
        ref={can5Ref}
        flavor="watermelon"
        floatSpeed={FLOAT_SPEED}
        floatIntensity={1}
        rotationIntensity={2}
        floatingRange={[-0.1, 0.1]}
      />
      <Environment
        files={["/hdrs/field.hdr"]}
        environmentIntensity={1.5}
        backgroundIntensity={1}
      />
    </group>
  );
}
