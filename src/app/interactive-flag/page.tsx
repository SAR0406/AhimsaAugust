
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Flag, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { FlowerShower } from "@/components/flower-shower";
import { PageHeader } from "@/components/page-header";
import ScratchToReveal from "@/components/ui/scratch-to-reveal";

export default function InteractiveFlagPage() {
  const [isHoisted, setIsHoisted] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);

  const handleToggleHoist = () => {
    setIsHoisted(!isHoisted);
  };
  
  useEffect(() => {
    let flowerTimeout: NodeJS.Timeout;
    if (isHoisted) {
       // Start flowers exactly when the flag reaches the top (after 20s)
       flowerTimeout = setTimeout(() => {
        setShowFlowers(true);
      }, 20000); 
    } else {
      setShowFlowers(false);
    }
    return () => clearTimeout(flowerTimeout);
  }, [isHoisted]);


  return (
    <div className="w-full flex flex-col items-center text-center">
      <PageHeader
        icon={<Upload className="h-10 w-10 text-primary" />}
        title="Hoist the Flag! 🚀"
        description="Scratch the image to reveal the Red Fort, then hoist the flag and celebrate with a shower of flowers."
      />

      <div className="relative w-full max-w-4xl h-[60vh] md:h-[70vh] max-h-[600px] rounded-lg overflow-hidden border flex items-end justify-center shadow-lg">
        <ScratchToReveal
            bgImage="https://images.unsplash.com/photo-1685790582503-1b2762d95407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxyZWQlMjBmb3J0JTIwfGVufDB8fHx8MTc1NDczOTAzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
            coverImage="https://placehold.co/1080x720.png"
            width={1080}
            height={720}
        />

        <FlowerShower show={showFlowers} zIndex="z-20" />

        {/* Flagpole */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-2 md:w-3 bg-gradient-to-t from-gray-700 to-gray-500 border-x-2 border-gray-800" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 md:h-5 md:w-5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-yellow-700 shadow-inner z-10" />
        
        {/* Rope */}
        <div className="absolute top-0 left-1/2 -translate-x-px h-full w-0.5 bg-gray-300/70" />

        {/* Flagpole Base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <div className="h-4 w-24 md:h-5 md:w-36 bg-gradient-to-t from-stone-400 to-stone-300 border-x-2 border-b-2 border-stone-500 rounded-t-sm" />
            <div className="h-3 w-32 md:h-4 md:w-44 bg-gradient-to-t from-stone-500 to-stone-400 border-2 border-stone-600" />
            <div className="h-3 w-40 md:h-4 md:w-52 bg-gradient-to-t from-stone-600 to-stone-500 border-2 border-stone-700 rounded-b-sm" />
        </div>
        
        <div
          className={cn(
            "absolute left-1/2 transition-all duration-[20000ms] ease-in-out z-10", 
            isHoisted ? "bottom-[calc(100%-80px)] sm:bottom-[calc(100%-120px)]" : "bottom-[20px]"
            )}
          style={{ 
            transform: 'translateX(calc(-2px + 0.125rem))',
           }}
        >
           <div className="relative">
             {/* Rope attached to flag */}
             <div className="absolute bottom-1/2 right-full w-2 h-full bg-gray-300/70"/>
             <Image
              src="https://cdn.pixabay.com/animation/2022/08/21/20/03/20-03-41-348_512.gif"
              alt="Waving Indian Flag"
              width={60}
              height={40}
              unoptimized
              className="w-[60px] h-[40px] sm:w-[90px] sm:h-[60px] drop-shadow-lg"
              data-ai-hint="indian flag"
            />
           </div>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleToggleHoist} size="lg" className="shadow-lg glow-on-hover">
          <Flag className="mr-2 h-5 w-5"/>
          {isHoisted ? "Lower Flag" : "Hoist Flag"}
        </Button>
      </div>
    </div>
  );
}
