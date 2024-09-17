"use client";

import { SVGProps } from "react";
import clsx from "clsx";
import classes from "./DrinkieLogo.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(useGSAP, Observer);

export function DrinkieLogo(props: SVGProps<SVGSVGElement>) {
  useGSAP(() => {
    gsap.from(".drinkie-logo", {
      opacity: 0,
      x: -500,
      duration: 1,
      ease: "bounce.out",
    });

    Observer.create({
      target: ".drinkie-logo",
      type: "pointer, touch",
      onHover: () => {
        gsap.to(".drinkie-logo", {
          scale: 1.5,
          rotate: 360,
          duration: 1,
          y: 20,
        });
      },
      onHoverEnd: () => {
        gsap.to(".drinkie-logo", {
          scale: 1,
          rotate: 0,
          y: 0,
          duration: 1,
        });
      },
    });
  });

  return (
    <>
      <div className="drinkie-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="299"
          height="138"
          viewBox="0 0 299 138" // Use the original width and height of the SVG content
          fill="none"
          {...props}
          className={clsx("group", props.className)}
        >
          <path
            stroke="currentColor"
            strokeWidth="17"
            d="M58.5 112.51V77.7m0 0V42.89l39.32 9.27L58.5 77.7zm0 0l39.32 34.81M118 49.21v63.7m80.5-67.34v37.76m0 32.25V83.33m0 0l28.66-31.45M198.5 83.33l31.9 22.3M245 50.54v63.7m51.5-63.7l-27.13-4.97v34.8m0 0v44.49l27.13-5.92m-27.13-38.56h29.36m-161.47 41.24V12l40.18 123V27.28M9 16.58v105.04l31.02-14.63V37.37L9 16.57z"
          ></path>
        </svg>
      </div>
    </>
  );
}
