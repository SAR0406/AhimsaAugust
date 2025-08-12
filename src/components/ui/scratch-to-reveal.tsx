
"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface ScratchToRevealProps {
  bgImage: string;
  coverImage: string;
  width: number;
  height: number;
}

const ScratchToReveal: React.FC<ScratchToRevealProps> = ({ bgImage, coverImage, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  let isDrawing = false;
  
  const getPosition = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e instanceof MouseEvent) {
      return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    }
    if (e.touches[0]) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: 0, y: 0 };
  };

  const scratch = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fill();
  };
  
  const checkReveal = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let transparentPixels = 0;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) {
        transparentPixels++;
      }
    }
    
    const totalPixels = canvas.width * canvas.height;
    if (transparentPixels / totalPixels > 0.7) {
      setIsRevealed(true);
    }
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    
    const cover = new window.Image();
    cover.src = coverImage;
    cover.onload = () => {
      ctx.drawImage(cover, 0, 0, canvas.width, canvas.height);
    };

    const start = (e: MouseEvent | TouchEvent) => {
        isDrawing = true;
        const { x, y } = getPosition(e);
        scratch(ctx, x, y);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;
        e.preventDefault();
        const { x, y } = getPosition(e);
        scratch(ctx, x, y);
    };

    const stop = () => {
        isDrawing = false;
        checkReveal(ctx);
    };

    canvas.addEventListener('mousedown', start, { passive: false });
    canvas.addEventListener('mousemove', draw, { passive: false });
    canvas.addEventListener('mouseup', stop, { passive: false });
    canvas.addEventListener('mouseleave', stop, { passive: false });
    
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stop, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stop);
      canvas.removeEventListener('mouseleave', stop);
      
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stop);
    };
  }, [coverImage]);

  return (
    <div className="relative w-full h-full">
      <Image
        src={bgImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
        data-ai-hint="red fort"
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 z-10 w-full h-full"
        style={{
            transition: 'opacity 0.8s ease-out',
            opacity: isRevealed ? 0 : 1,
            touchAction: 'none'
        }}
      />
    </div>
  );
};

export default ScratchToReveal;
