
"use client";

import { PageHeader } from "@/components/page-header";
import { MessageSquare } from "lucide-react";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const StoryNarratorClient = React.lazy(() => 
  import('@/components/story-narrator-client').then(module => ({ default: module.StoryNarratorClient }))
);

export default function StoryNarratorPage() {
  return (
    <div className="w-full">
      <PageHeader
        icon={<MessageSquare className="h-10 w-10 text-primary" />}
        title="AI Freedom Story Narrator 📖"
        description="Ask a question, and our AI storyteller will share a tale about India's rich history, freedom fighters, and pivotal moments!"
      />
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <StoryNarratorClient />
        </Suspense>
      </div>
    </div>
  );
}
