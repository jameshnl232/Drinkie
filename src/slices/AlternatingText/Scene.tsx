import FloatingCan from "@/components/FloatingCan";
import { Environment } from "@react-three/drei";
import React, { use, useRef } from "react";
import { Group } from "three";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

export default function Scene({}: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const canRef = useRef<Group>(null);

  const bgColors = ["#3e82f0", "#800171", "#800171"];
  const textColors = ["#fde047 ", "#f7f7c3", "#eef51d"];

  const sections = gsap.utils.toArray(".alternating-section");
  useGSAP(
    () => {
      if (!canRef.current) return;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
        },
      });

      sections.forEach((_, index) => {
        if (!canRef.current) return;
        if (index === 0) return;

        const isOdd = index % 2 != 0;

        scrollTl
          .to(canRef.current.position, {
            x: isDesktop ? (isOdd ? "-3" : "0") : "0",
            ease: "circ.inOut",
            delay: 0.5,
            duration: 1,
          })
          .to(
            canRef.current.rotation,
            {
              y: isDesktop ? (isOdd ? 0.4 : -0.4) : 0,
              ease: "back.inOut",
              duration: 1,
            },
            "<",
          )

          .to(".alternating-text-container", {
            backgroundColor: gsap.utils.wrap(bgColors, index - 1),
          })
          .to(
            ".alternating-section-heading",
            {
              color: gsap.utils.wrap(textColors, index),
              duration: 0.2,
            },
            "<",
          );
      });
    },
    { dependencies: [isDesktop] },
  );

  return (
    <group position-x={isDesktop ? "1.5" : "0"}>
      <FloatingCan ref={canRef} flavor="lemonLime" />
      <Environment files={["/hdrs/field.hdr"]} environmentIntensity={1.5} />
    </group>
  );
}
