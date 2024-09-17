"use client";

import { Bounded } from "@/components/Bounded";
import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import { use, useRef, useState } from "react";
import ArrowButton from "./ArrowButton";
import { WavyCircles } from "./WavyCircles";
import { Group } from "three";

import gsap from "gsap";

const SPINS_ON_CHANGE = 8;
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);

  const sodaCanRef = useRef<Group>(null);

  function spinCan(index: number) {
    if (!sodaCanRef.current) return;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        duration: 1,
        ease: "power2.inOut",
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circle-inner",
        {
          backgroundColor: FLAVORS[index].color,
          fill: FLAVORS[index].color,
          duration: 1,
          overwrite: "auto",
        },
        0,
      )
      .to(
        ".heading, .text-wrapper, .price",
        {
          color: "white",
          overwrite: "auto",
        },
        0,
      )
      .to(".text-wrapper", {
        y: -10,
        duration: 0.2,
        opacity: 0,
      }, 0)
      .to(
        {}, 
        {
          onStart: () => {
            setCurrentFlavorIndex(index);
          }
        }, 0.5
      )
      .to(".text-wrapper", {
        y: 0,
        duration: 0.2,
        opacity: 1,
      }, 0.7);
  }
  function nextFlavor() {
    spinCan((currentFlavorIndex + 1) % FLAVORS.length);
    setCurrentFlavorIndex((currentFlavorIndex + 1) % FLAVORS.length);
  }

  function previousFlavor() {
    spinCan((currentFlavorIndex - 1 + FLAVORS.length) % FLAVORS.length);
    setCurrentFlavorIndex(
      (currentFlavorIndex - 1 + FLAVORS.length) % FLAVORS.length,
    );
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel grid-rows-[auto, 4fr, auto] relative grid h-screen w-screen justify-center overflow-hidden bg-white py-12 text-white"
    >
      {/* Background */}
      <div className="background pointer-events-none absolute inset-0 bg-[#918804] bg-opacity-50"></div>

      {/* wavy background */}
      <WavyCircles className="wavy-background absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-green-900" />

      <h2 className="heading relative text-center text-5xl font-bold text-gray-900">
        {asText(slice.primary.heading)}
      </h2>

      {/*  Carousel */}
      <div className="grid-cols-[auto, auto, auto] grid h-full grid-flow-col items-center">
        {/* left */}
        <ArrowButton
          onClick={previousFlavor}
          label="Previous Flavor"
          direction="left"
        ></ArrowButton>
        {/* middle */}

        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files={["/hdrs/field.hdr"]}
            environmentIntensity={2}
            environmentRotation={[3, 3, 3]}
          />
          <directionalLight intensity={30} position={[0, 1.5, 0]} />
        </View>

        {/* right */}
        <ArrowButton
          onClick={nextFlavor}
          label="Next Flavor"
          direction="right"
        ></ArrowButton>
      </div>

      {/*  Prices and flavor */}
      <div className="text-area relative z-20 mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium uppercase text-gray-900">
          <p>{FLAVORS[currentFlavorIndex].flavor}</p>
        </div>

        <div className="price mt-2 text-xl font-normal text-gray-900 opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
    </Bounded>
  );
};

export default Carousel;
