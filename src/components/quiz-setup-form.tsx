
"use client";

import { useFormStatus } from "react-dom";
import type { GenerateState } from "@/app/quiz/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCircuit } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <BrainCircuit className="mr-2 h-4 w-4 animate-spin" />
          Generating Quiz...
        </>
      ) : (
        "Generate Quiz"
      )}
    </Button>
  );
}

interface QuizSetupFormProps {
    state: GenerateState;
    dispatch: (payload: FormData) => void;
}

export function QuizSetupForm({ state, dispatch }: QuizSetupFormProps) {
  const classOptions = Array.from({ length: 12 }, (_, i) => {
    const grade = i + 1;
    let suffix = 'th';
    if (grade === 1) suffix = 'st';
    if (grade === 2) suffix = 'nd';
    if (grade === 3) suffix = 'rd';
    return `${grade}${suffix} Grade`;
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <form action={dispatch}>
        <CardHeader>
          <CardTitle className="font-headline">Quiz Setup</CardTitle>
          <CardDescription>
            Tell us a bit about yourself to generate a personalized quiz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="userClass">Your Class / Grade</Label>
            <Select name="userClass" defaultValue="10th Grade">
                <SelectTrigger className="focus-glow">
                    <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                    {classOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                    <SelectItem value="College Student">College Student</SelectItem>
                </SelectContent>
            </Select>
            {state.errors?.userClass && (
              <div className="text-sm font-medium text-destructive">
                {state.errors.userClass.join(", ")}
              </div>
            )}
          </div>
           <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
             <Select name="difficulty" defaultValue="Medium">
                <SelectTrigger className="focus-glow">
                    <SelectValue placeholder="Select a difficulty" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                    <SelectItem value="Very Hard">Very Hard</SelectItem>
                </SelectContent>
            </Select>
             {state.errors?.difficulty && (
              <div className="text-sm font-medium text-destructive">
                {state.errors.difficulty.join(", ")}
              </div>
            )}
          </div>
           <div className="space-y-2">
            <Label htmlFor="numQuestions">Number of Questions</Label>
            <Input
              id="numQuestions"
              name="numQuestions"
              type="number"
              defaultValue="5"
              min="1"
              max="10"
              required
              className="focus-glow"
            />
             {state.errors?.numQuestions && (
              <div className="text-sm font-medium text-destructive">
                {state.errors.numQuestions.join(", ")}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
