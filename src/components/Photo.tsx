import Image, { type ImageProps } from "next/image";
import blur from "@/lib/blur.json";

const blurMap = blur as Record<string, string>;

/** next/image with a generated blur placeholder when one exists for the path. */
export default function Photo({ src, alt, ...rest }: ImageProps) {
  const key = typeof src === "string" ? src : "";
  const placeholder = blurMap[key];
  return (
    <Image
      src={src}
      alt={alt}
      {...(placeholder ? { placeholder: "blur", blurDataURL: placeholder } : {})}
      {...rest}
    />
  );
}
