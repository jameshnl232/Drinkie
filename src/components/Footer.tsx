import CircleText from "./CircleText";
import { DrinkieLogo } from "./DrinkieLogo";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-gray-400 text-black">
      <div className="relative flex justify-center items-center py-10">
        <DrinkieLogo />
        <div className="absolute right-24 top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28">
            <CircleText />
        </div>
      </div>
    </footer>
  );
}
