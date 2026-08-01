"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: string;
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _key: string;
  }>;

  isStock?: number | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-137.5 min-h-112.5 border border-border rounded-lg group overflow-hidden bg-white"
        >
          <Image
            src={urlFor(active).url()}
            alt="ProductImage"
            width={800}
            height={800}
            className={`w-full h-full object-contain p-6 group-hover:scale-110 hoverEffect ${
              isStock === 0 ? "opacity-50" : ""
            }`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-5 gap-2 h-20">
        {images.map((image) => (
          <button
            key={image._key}
            onClick={() => setActive(image)}
            className={`border rounded-md overflow-hidden bg-white transition-all duration-200 ${
              active?._key === image._key
                ? "border-primary ring-1 ring-primary/30"
                : "border-border opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail-${image._key}`}
              width={100}
              height={100}
              className="w-full h-full object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
