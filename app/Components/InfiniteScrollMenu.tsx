"use client";
import React, { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

interface Category {
  name: string;
}

const categories: Category[] = [
  { name: "text to image" },
  { name: "video creating" },
  { name: "Audio generating" },
  { name: "Document summurazing" },
  { name: "Voice changer" },
  { name: "Image" },
  { name: "Video" },
  { name: "Text to Video" },
  { name: "Image to Video" },
  { name: "Audio" },
  { name: "Logo generation" },
  { name: "Animation" },
];

const InfiniteScrollMenu: React.FC = () => {
  const baseVelocity = -40;
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useTransform(baseX, (v) => {
    const contentWidth = categories.length * 120; // Approximate width of each button
    return `${wrap(-contentWidth, 0, v)}px`;
  });

  useAnimationFrame((t, delta) => {
    const moveBy = baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={containerRef} className="w-full overflow-hidden mt-12 rounded-full">
      <motion.div className="flex space-x-4 whitespace-nowrap" style={{ x }}>
        {Array(10)
          .fill(categories)
          .flat()
          .map((category, index) => (
            <motion.button
              key={`${category.name}-${index}`}
              className="px-4 py-2 text-white rounded-full transition-colors duration-200 flex-shrink-0"
              style={{
                background: "linear-gradient(45deg, #8B5CF6, #D946EF)",
                boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
      </motion.div>
    </div>
  );
};

const wrap = (min: number, max: number, v: number): number => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default InfiniteScrollMenu;
