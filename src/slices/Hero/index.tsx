"use client";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { asText, Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TextSplitter } from "./TextSplitter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "./Scene";
import { View } from "@react-three/drei";
import { Bubbles } from "@/components/Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const onComputer = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && onComputer) return;

      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 0.5,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.5,
        });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          {
            backgroundColor: "#f9a8d4",
          },
          {
            backgroundColor: "#d8b4fe",
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: 25,
          opacity: 0,
          stagger: 0.05,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          opacity: 0,
          y: 20,
        });
    },
    { dependencies: [ready, onComputer] },
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero mx-auto w-screen bg-pink-300 opacity-0 "
    >
      {onComputer && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles speed={3} repeat={true} count={300} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-start justify-center">
          <div className="grid auto-rows-min items-center justify-center gap-y-2 text-center">
            <h1 className="hero-header mt-10 text-8xl font-black uppercase leading-[.8] md:text-[10rem] lg:text-[10rem]">
              <TextSplitter
                className="hero-header-word bg-gradient-to-bl from-stone-800 via-indigo-600 to-teal-900 bg-clip-text text-transparent"
                wordDisplayStyle="block"
                text={asText(slice.primary.HeroHeading)}
              />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-white lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-wrap text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            <Button
              buttonLink={slice.primary.buttonlink}
              buttonText={slice.primary.buttontext}
              className="hero-button mx-auto mt-5"
            />
          </div>
        </div>
        <div className="text-side itens.center relative z-[80] grid h-screen grid-cols-1 gap-4 md:grid-cols-2">
          {/*  <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cansimage}
          /> */}
          <div>
            <div className="h2 text-side-heading text-balance text-6xl font-black uppercase text-pink-950 lg:text-8xl">
              <TextSplitter text={asText(slice.primary.secondheading)} />
            </div>
            <div className="text-side-body max-width-xl mt-4 text-balance text-xl font-semibold text-gray-900">
              <PrismicRichText field={slice.primary.secondbody} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
