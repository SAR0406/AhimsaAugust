
"use client";

import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

interface ShineBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string[];
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
}

const ShineBorder = ({
  children,
  className,
  color = ["#A07CFE", "#FE8A71", "#FED7AA", "#9C89FF", "#A07CFE"],
  borderRadius = 8,
  borderWidth = 1,
  duration = 5,
}: ShineBorderProps) => {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as CSSProperties
      }
      className={cn(
        "relative rounded-[var(--border-radius)]",
        "p-[1px] bg-background",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          "rounded-[calc(var(--border-radius)-1px)]",
        )}
      >
        <div
          className="animate-shine-pulse rounded-[calc(var(--border-radius)-1px)] [background-image:var(--gradient)] [background-size:200%_100%]"
          style={
            {
              "--border-width": `${borderWidth}px`,
              "--border-radius": `${borderRadius}px`,
              "--duration": `${duration}s`,
              "--gradient": `conic-gradient(from 180deg at 50% 50%, ${color.join(
                ", ",
              )}, ${color[0]})`,
            } as CSSProperties
          }
        />
      </div>

     <div className="rounded-[calc(var(--border-radius)-1px)] bg-background w-full h-full">
        {children}
     </div>
    </div>
  );
};

export default ShineBorder;
