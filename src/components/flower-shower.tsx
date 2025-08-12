
"use client";

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

const FlowerPetal = ({ style, colorClass }: { style: React.CSSProperties, colorClass: string }) => (
    <div 
        className={cn(
            "absolute rounded-full w-2 h-3 opacity-80", 
            colorClass
        )} 
        style={{
            ...style,
            animationName: 'fall, drift',
            animationTimingFunction: 'linear',
            top: '-20px',
        }} 
    />
);
FlowerPetal.displayName = 'FlowerPetal';

interface FlowerShowerProps {
  show: boolean;
  petalCount?: number;
  petalColors?: string[];
  zIndex?: string;
}

const MemoizedFlowerShower = ({ show, petalCount = 150, petalColors = ['bg-primary', 'bg-background', 'bg-accent'], zIndex = "z-50" }: FlowerShowerProps) => {
    const flowerPetals = useMemo(() => {
        if (typeof window === 'undefined') return [];
        return Array.from({ length: petalCount }).map((_, i) => {
            const drift = Math.random() * 200 - 100;
            const style: React.CSSProperties = {
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s, ${3 + Math.random() * 2}s`,
                '--drift': `${drift}px`
            } as React.CSSProperties;
            const colorClass = petalColors[Math.floor(Math.random() * petalColors.length)];
            return <FlowerPetal key={i} style={style} colorClass={colorClass} />;
        });
    }, [petalCount, petalColors]);

    if (!show) return null;

    return (
        <div className={cn("fixed inset-0 pointer-events-none overflow-hidden", zIndex)}>
           <style>
                {`
                    @keyframes fall {
                        0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
                    }
                    @keyframes drift {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(var(--drift)); }
                    }
                `}
            </style>
            {flowerPetals}
        </div>
    );
};
MemoizedFlowerShower.displayName = 'MemoizedFlowerShower';


export const FlowerShower = React.memo(MemoizedFlowerShower);
