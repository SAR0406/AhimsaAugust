import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { PartyPopper } from "lucide-react";
import Image from "next/image";

export default function HappyIndependenceDayPage() {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <PageHeader
        icon={<PartyPopper className="h-10 w-10 text-primary" />}
        title="Happy Independence Day! 🇮🇳"
        description="Wishing you a day filled with pride, patriotism, and the spirit of freedom. Jai Hind!"
      />

      <div className="relative w-full max-w-4xl">
        <Card className="w-full h-auto overflow-hidden">
           <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1592302604174-25c49d1541df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjcm93ZCUyMGNlbGVicmF0aW9ufGVufDB8fHx8MTc1NDc0Nzc3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Celebration of Independence Day"
                layout="fill"
                objectFit="cover"
                data-ai-hint="crowd celebration"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-8">
                 <h2 className="text-4xl md:text-6xl font-headline font-bold text-white drop-shadow-lg">
                   A Nation Rejoices
                 </h2>
              </div>
          </div>
        </Card>
        <div className="mt-8 text-lg text-muted-foreground max-w-3xl mx-auto space-y-4">
            <p>
                Today, we celebrate the unwavering spirit of our freedom fighters and the birth of our great nation. It's a day to remember our rich heritage and to recommit ourselves to building a stronger, more prosperous India for generations to come.
            </p>
            <p>
                Let the tricolor fly high, and may our hearts swell with pride. From all of us at Ahimsa House, we wish you a very Happy Independence Day!
            </p>
        </div>
      </div>
    </div>
  );
}
