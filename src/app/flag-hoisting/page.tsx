
"use client";

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag } from "lucide-react";
import Image from "next/image";

export default function FlagHoistingPage() {
  return (
    <div className="w-full">
      <PageHeader
        icon={<Flag className="h-10 w-10 text-primary" />}
        title="The Flag Hoisting Ceremony 🇮🇳"
        description="A symbol of national pride and the dawn of a new era."
      />

      <Card className="overflow-hidden shadow-lg max-w-4xl mx-auto relative">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">A Moment of Pride</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-muted-foreground">
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden border">
              <Image
                src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxpbmRpYSUyMGZsYWd8ZW58MHx8fHwxNzU0ODQ0NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Children with Indian Flag"
                layout="fill"
                objectFit="cover"
                data-ai-hint="children indian flag"
              />
          </div>
          <p>
            The flag hoisting ceremony on Independence Day is one of the most significant and cherished traditions in India. On August 15, 1947, Jawaharlal Nehru, the first Prime Minister of India, hoisted the Indian national flag above the Lahori Gate of the Red Fort in Delhi. This act marked the end of nearly 200 years of British colonial rule and the birth of a free and independent India.
          </p>
          <p>
            Since then, every year on Independence Day, the incumbent Prime Minister hoists the national flag at the Red Fort, followed by an address to the nation. The ceremony is a powerful reminder of the sacrifices made by countless freedom fighters and serves as a tribute to the sovereignty and unity of the country. It is a moment of immense national pride, celebrated with patriotic fervor across the nation, in schools, government offices, and public spaces.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
