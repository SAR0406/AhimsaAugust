
"use client";

import { cn } from "@/lib/utils";
import {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export const NeonGradientCard = ({
  children,
  className,
  as: Component = "div",
  borderSize = 2,
  borderRadius = 12,
  neonColors = {
    firstColor: "hsl(var(--primary))",
    secondColor: "hsl(var(--accent))",
  },
  ...props
}: {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  borderSize?: number;
  borderRadius?: number;
  neonColors?: {
    firstColor: string;
    secondColor: string;
  };
  [key: string]: any;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if(containerRef.current) {
        resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <Component
      {...props}
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--gradient-border-radius": `${
            borderRadius + borderSize
          }px`,
        } as CSSProperties
      }
      className={cn(
        "relative z-10 w-full rounded-[var(--border-radius)]",
        className,
      )}
    >
      <div
        className={cn(
          "absolute z-[-2] h-[calc(100%_+_var(--border-size)_*_2)] w-[calc(100%_+_var(--border-size)_*_2)]",
          "bg-[linear-gradient(90deg,var(--neon-first-color),var(--neon-second-color),var(--neon-first-color))] animate-[neon-gradient_10s_infinite_linear]",
          "rounded-[var(--gradient-border-radius)]"
        )}
         style={
          {
            top: "calc(-1 * var(--border-size))",
            left: "calc(-1 * var(--border-size))",
            backgroundSize: "200% 200%",
          } as CSSProperties
        }
      ></div>
      <div
        className="
          absolute
          z-[-1]
          h-full
          w-full
          rounded-[var(--card-content-radius)]
          bg-background
        "
      ></div>
      <div className="relative z-10 h-full w-full rounded-[var(--card-content-radius)]">
        {children}
      </div>
    </Component>
  );
};
