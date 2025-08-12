
"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "hsl(var(--primary))",
  colorTo = "hsl(var(--accent))",
  delay = 0,
}: {
  className?: string;
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        // Mask gradient
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // Mask gradient angle
        "[--mask-direction:180deg]",
        "after:animate-border-beam after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_100%_100%_0_round_calc(var(--border-radius)-var(--border-width)*1px))]",
        className,
      )}
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
    />
  );
};
