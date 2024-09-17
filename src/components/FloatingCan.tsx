import { Float } from "@react-three/drei";
import { SodaCan, SodaCanProps } from "./SodaCan";
import { forwardRef, ReactNode } from "react";
import { Group } from "three";

type FloatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  floatSpeed?: number;
  floatIntensity?: number;
  rotationIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  ({ 
    flavor = "blackCherry",
    rotationIntensity = 0,
    floatSpeed = 3,
    floatIntensity = 1,
    floatingRange = [-0.1, 0.1],
    children,
    ...props
  }, ref) => {
    return (
      <group ref={ref}>
        <Float
          speed={floatSpeed} // Animation speed, defaults to 1
          rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
          floatingRange={floatingRange} // Up/down floating range, defaults to [0, 0]
          floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          {...props}
        >
          <SodaCan flavor={flavor} />
        </Float>
      </group>
    );
  },
);

export default FloatingCan;
