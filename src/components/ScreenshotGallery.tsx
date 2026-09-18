"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IconGlyph from "@/components/IconGlyph";

export default function ScreenshotGallery({ assetDir, assets, name }: { assetDir: string; assets: string[]; name: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  const shown = assets.slice(0, 4);
  if (shown.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {shown.map((file, i) => (
          <button
            key={file}
            type="button"
            onClick={() => setOpenIdx(i)}
            className="relative aspect-video overflow-hidden border cursor-pointer group"
            style={{ borderRadius: 8, borderColor: "var(--line)", background: "var(--bg-raised)" }}
            aria-label={`View screenshot ${i + 1} of ${name}`}
          >
            <Image
              src={`${assetDir}/${file}`}
              alt={`${name} screenshot ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              onLoad={() => setLoaded((prev) => ({ ...prev, [i]: true }))}
              className="object-cover object-top transition-all duration-500 group-hover:scale-105"
              style={{ opacity: loaded[i] ? 1 : 0 }}
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: "rgba(4,8,10,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIdx(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`${assetDir}/${shown[openIdx]}`}
                alt={`${name} screenshot ${openIdx + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setOpenIdx(null)}
              className="absolute top-5 right-5 p-2"
              aria-label="Close screenshot viewer"
            >
              <IconGlyph name="X" size={26} color="var(--text)" weight="regular" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
