
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Camera, Flag, HelpCircle, History, Quote, Brush, Upload, PartyPopper, TimerIcon, MessageSquare, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { CountdownTimer } from "@/components/countdown-timer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFlowerShowerStore } from "@/store/flower-shower-store";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { BorderBeam } from "@/components/ui/border-beam";
import ShineBorder from "@/components/ui/shine-border";

const featureCards = [
  {
    icon: <History className="h-8 w-8 text-primary" />,
    title: "Journey Through Time ⏳",
    description: "Explore the key milestones of the freedom struggle.",
    href: "/history",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Did You Know? 💡",
    description: "Uncover fascinating facts about India's independence.",
    href: "/facts",
  },
  {
    icon: <Camera className="h-8 w-8 text-primary" />,
    title: "Celebration Gallery 🖼️",
    description: "A visual journey through vibrant celebrations.",
    href: "/gallery",
  },
  {
    icon: <Quote className="h-8 w-8 text-primary" />,
    title: "Words of Freedom 📜",
    description: "Inspiring words from the architects of independence.",
    href: "/quotes",
  },
  {
    icon: <HelpCircle className="h-8 w-8 text-primary" />,
    title: "The Independence Quiz ❓",
    description: "Test your knowledge about the freedom struggle.",
    href: "/quiz",
  },
  {
    icon: <Flag className="h-8 w-8 text-primary" />,
    title: "The Flag Hoisting 🇮🇳",
    description: "Learn about the significance of our national flag.",
    href: "/flag-hoisting",
  },
  {
    icon: <Upload className="h-8 w-8 text-primary" />,
    title: "Hoist The Flag 🚀",
    description: "An interactive flag hoisting ceremony experience.",
    href: "/interactive-flag"
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "AI Freedom Story Narrator 📖",
    description: "Ask our AI to tell you a story about India's history.",
    href: "/story-narrator"
  },
  {
    icon: <Brush className="h-8 w-8 text-primary" />,
    title: "AI Art Generator 🎨",
    description: "Let AI create a unique artwork from a famous quote.",
    href: "/art-generator"
  },
  {
    icon: <Wand2 className="h-8 w-8 text-primary" />,
    title: "AI Quote Generator ✨",
    description: "Upload an image to get a patriotic caption.",
    href: "/quote-generator"
  }
];

export default function Home() {
  const [isFinished, setIsFinished] = useState(false);
  const { setShowFlowerPreview } = useFlowerShowerStore();
  const router = useRouter();

  const handleCountdownEnd = () => {
    setIsFinished(true);
    setShowFlowerPreview(true);
    setTimeout(() => setShowFlowerPreview(false), 8000); // Show for 8 seconds
  };
  
  const handlePreview = () => {
    setShowFlowerPreview(true);
    setTimeout(() => setShowFlowerPreview(false), 5000); // Show preview for 5 seconds
  };
  
  // Reset flower shower when navigating away
  useEffect(() => {
    return () => {
      if(isFinished) {
        setShowFlowerPreview(false);
      }
    }
  }, [isFinished, setShowFlowerPreview]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-2xl min-h-[400px] md:min-h-[500px]">
        <Image 
            src="https://think360studio-media.s3.ap-south-1.amazonaws.com/03-may/Indian-Flag3-Wallpaper-1280x800-1.jpg"
            alt="Indian Flag Background"
            layout="fill"
            objectFit="cover"
            priority
            className="absolute inset-0"
            data-ai-hint="indian flag"
        />
      </section>

      {/* Intro Text Section */}
       <section className="py-16 pb-8 md:pt-24 md:pb-12">
        <NeonGradientCard
          className="w-full max-w-4xl mx-auto p-8 text-center"
        >
           <BorderBeam size={250} duration={12} delay={9} />
           <PageHeader
            icon={<Flag className="h-12 w-12 md:h-16 md:w-16 mx-auto text-primary" />}
            title="🇮🇳 Ahimsa House 🙏"
            description="An interactive celebration of India's Independence Day. Explore the rich history 🇮🇳, vibrant culture 🎨, and enduring spirit of freedom 🕊️."
           />
        </NeonGradientCard>
      </section>


      {/* Countdown Section */}
      <section className="py-8 md:py-12">
        <PageHeader
          icon={<TimerIcon className="h-12 w-12 md:h-16 md:w-16 mx-auto text-primary mb-4" />}
          title="Countdown to Freedom"
          description="Join us as we count down to the 78th Independence Day of India. The celebration begins on August 15th!"
        />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
            <CountdownTimer onCountdownEnd={handleCountdownEnd} onPreview={handlePreview} />
              <ShineBorder
                  className="text-center text-2xl font-bold capitalize"
                  color={["#F59E0B", "#10B981", "#FFFFFF"]}
              >
                <Button 
                    size="lg" 
                    className="shadow-lg" 
                    disabled={!isFinished}
                    onClick={() => router.push('/happy-independence-day')}
                >
                  <PartyPopper className="mr-2 h-5 w-5"/>
                  Celebrate Now!
                </Button>
            </ShineBorder>
        </div>
      </section>


      {/* Features Section */}
       <section id="features" className="py-16 md:py-24">
        <PageHeader
          icon={<ArrowRight className="h-12 w-12 md:h-16 md:w-16 mx-auto text-primary mb-4" />}
          title="Explore the Celebration 🎉"
          description="Dive into the various facets of India's Independence Day through our interactive sections."
        />

        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {featureCards.map((feature, index) => (
            <Link href={feature.href} key={index} className="block h-full">
              <Card className="h-full flex flex-col justify-between text-center cursor-pointer glow-on-hover">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-max">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
