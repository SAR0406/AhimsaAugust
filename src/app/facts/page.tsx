

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FACTS_DATA } from "@/lib/constants";
import { BookOpen } from "lucide-react";

export default function FactsPage() {
  return (
    <div className="w-full">
      <PageHeader
        icon={<BookOpen className="h-10 w-10 text-primary" />}
        title="Did You Know? 💡"
        description="Uncover fascinating facts and trivia about India's journey to freedom."
      />

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {FACTS_DATA.map((fact, index) => (
            <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 glow-on-hover">
              <CardHeader className="flex flex-row items-center gap-4">
                <fact.icon className="w-10 h-10 text-primary" />
                <CardTitle className="font-headline text-2xl">{fact.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{fact.description}</p>
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
