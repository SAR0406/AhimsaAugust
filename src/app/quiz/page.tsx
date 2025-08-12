
"use client";

import { PageHeader } from "@/components/page-header";
import { HelpCircle } from "lucide-react";
import React, { useActionState, useEffect, useState, Suspense } from "react";
import { generateQuizAction, type GenerateState } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const QuizClient = React.lazy(() => 
    import('@/components/quiz-client').then(module => ({ default: module.QuizClient }))
);
const QuizSetupForm = React.lazy(() =>
    import('@/components/quiz-setup-form').then(module => ({ default: module.QuizSetupForm }))
);

export default function QuizPage() {
  const initialState: GenerateState = { message: null, errors: {}, questions: null };
  const [state, dispatch] = useActionState(generateQuizAction, initialState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pageDescription = state.questions 
    ? "Test your knowledge about India's rich history and freedom struggle."
    : "First, set up your quiz preferences below and let our AI generate a custom quiz for you!";

  if (!isClient) {
    return null;
  }

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      <PageHeader
        icon={<HelpCircle className="h-10 w-10 text-primary" />}
        title="The Independence Quiz ❓"
        description={pageDescription}
      />
      <div className="max-w-3xl mx-auto">
        <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
            {state.questions ? (
                <QuizClient questions={state.questions} />
            ) : (
                <QuizSetupForm state={state} dispatch={dispatch} />
            )}
        </Suspense>
      </div>
    </motion.div>
  );
}
