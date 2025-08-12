
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { askQuestion, type State } from "@/app/story-narrator/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </>
      ) : (
        "Ask Question"
      )}
    </Button>
  );
}

export function StoryNarratorClient() {
  const initialState: State = { message: null, errors: {}, answer: null };
  const [state, dispatch] = useActionState(askQuestion, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.answer) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
    if (state.answer) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <form ref={formRef} action={dispatch}>
          <CardHeader>
            <CardTitle className="font-headline">Ask a Question</CardTitle>
            <CardDescription>
             Tell me about the 1942 Quit India Movement or what happen on this day?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Your Question</Label>
              <Textarea
                id="question"
                name="question"
                placeholder="e.g., Tell me about Mahatma Gandhi..."
                required
                className="focus-glow"
              />
            </div>
            {state.errors?.question && (
              <div className="text-sm font-medium text-destructive">
                {state.errors.question.join(", ")}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.answer && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot className="h-6 w-6 text-primary"/> The Story
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-foreground whitespace-pre-wrap">{state.answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
