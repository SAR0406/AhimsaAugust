
"use client";

import { PageHeader } from "@/components/page-header";
import { Brush } from "lucide-react";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ArtGeneratorClient = React.lazy(() =>
  import('@/components/art-generator-client').then(module => ({ default: module.ArtGeneratorClient }))
);

export default function ArtGeneratorPage() {
  return (
    <div className="w-full">
       <PageHeader
        icon={<Brush className="h-10 w-10 text-primary" />}
        title="AI Art Generator 🎨"
        description="Select a famous quote and let our AI generate a unique, symbolic artwork inspired by it."
      />
      <div className="max-w-3xl mx-auto">
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <ArtGeneratorClient />
        </Suspense>
      </div>
    </div>
  );
}
