

"use client";

import { PageHeader } from "@/components/page-header";
import { GALLERY_IMAGES } from "@/lib/constants";
import { Camera } from "lucide-react";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const GalleryClient = React.lazy(() =>
  import('@/components/gallery-client').then(module => ({ default: module.GalleryClient }))
);

export default function GalleryPage() {
  return (
    <div 
      className="w-full"
    >
      <PageHeader
        icon={<Camera className="h-10 w-10 text-primary" />}
        title="Celebration Gallery 🖼️"
        description="A visual journey through the vibrant celebrations of Independence Day."
      />
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<Skeleton className="h-[60vh] w-full" />}>
            <GalleryClient images={GALLERY_IMAGES} />
        </Suspense>
      </div>
    </div>
  );
}
