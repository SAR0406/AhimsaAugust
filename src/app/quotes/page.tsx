
"use client";

import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { QUOTES_DATA } from "@/lib/constants";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function QuotesPage() {
  return (
    <div className="w-full">
      <PageHeader
        icon={<Quote className="h-10 w-10 text-primary" />}
        title="Words of Freedom 📜"
        description="Inspiring words from the architects of India's independence."
      />

      <div className="space-y-8 max-w-4xl mx-auto">
        {QUOTES_DATA.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden glow-on-hover">
              <CardContent className="p-6">
                <blockquote className="border-l-4 border-primary pl-4">
                  <p className="text-xl italic text-foreground">
                    "{item.quote}"
                  </p>
                </blockquote>
                <p className="mt-4 text-right font-semibold text-muted-foreground">
                  - {item.author}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
