import { LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

type Props = {
  buttonLink: LinkField;
  buttonText: string | null;
  className?: string;
};

export default function Button({ buttonLink, buttonText, className }: Props) {
  return (
    <PrismicNextLink
      field={buttonLink}
      className={clsx(
        "md:text-2xl rounded-xl bg-sky-400 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-sky-700",
        className,
      )}
    >
      {buttonText}
    </PrismicNextLink>
  );
}
