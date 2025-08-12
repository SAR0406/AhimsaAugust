import { PageHeader } from "@/components/page-header";
import { QuoteGeneratorClient } from "@/components/quote-generator-client";
import { Wand2 } from "lucide-react";

export default function QuoteGeneratorPage() {
  return (
    <div className="w-full">
       <PageHeader
        icon={<Wand2 className="h-10 w-10 text-primary" />}
        title="AI Quote Generator ✨"
        description="Upload a photo and let our AI generate a unique, patriotic caption perfect for Independence Day."
      />
      <div className="max-w-3xl mx-auto">
        <QuoteGeneratorClient />
      </div>
    </div>
  );
}
