
"use client";

import { useState, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, RefreshCw, HelpCircle, BrainCircuit, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "@/lib/types";
import { verifyAnswerAction, type VerifyState } from "@/app/quiz/actions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

function VerifyButton({ question, userSuggestedAnswer }: { question: Question, userSuggestedAnswer: string }) {
    const { pending } = useFormStatus();

    return (
         <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="mt-2 text-xs h-auto py-1 px-2">
                <HelpCircle className="mr-2 h-3 w-3" />
                Think this is wrong? Verify with AI
            </Button>
        </AlertDialogTrigger>
    )
}

function VerifyDialog({ question, userSuggestedAnswer, open, onOpenChange }: { question: Question, userSuggestedAnswer: string, open: boolean, onOpenChange: (open: boolean) => void }) {
    const initialState: VerifyState = { message: null };
    const [state, formAction] = useActionState(verifyAnswerAction, initialState);
    const { pending } = useFormStatus();

    useEffect(() => {
        // Reset state when dialog is closed
        if (!open) {
            // A simple way to reset state is to have a parent component key change
            // but for this simple case, we just handle the visual part.
            // A more robust solution might involve a dedicated reset action.
        }
    }, [open]);

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <form action={formAction}>
                    <input type="hidden" name="question" value={question.question} />
                    <input type="hidden" name="options" value={question.options.join(',')} />
                    <input type="hidden" name="providedAnswer" value={question.correctAnswer} />
                    <input type="hidden" name="userSuggestedAnswer" value={userSuggestedAnswer} />

                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <BrainCircuit className="h-6 w-6 text-primary"/> AI Verification
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Let's double-check this answer with our AI.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {pending && (
                        <div className="flex items-center justify-center my-8">
                            <Loader className="h-8 w-8 animate-spin text-primary" />
                            <p className="ml-4 text-muted-foreground">Verifying...</p>
                        </div>
                    )}
                    
                    {state.data && (
                         <div className="mt-4 space-y-2">
                            <h4 className="font-bold">Verification Result:</h4>
                            <p>
                                <span className="font-semibold">Is the quiz's original answer correct? </span> 
                                {state.data.isProvidedAnswerCorrect ? 
                                    <span className="text-green-500 font-bold">Yes</span> : 
                                    <span className="text-red-500 font-bold">No</span>
                                }
                            </p>
                            <p><span className="font-semibold">Correct Answer:</span> {state.data.correctAnswer}</p>
                            <div>
                                <h5 className="font-semibold">Explanation:</h5>
                                <p className="text-sm text-muted-foreground">{state.data.explanation}</p>
                            </div>
                        </div>
                    )}


                    <AlertDialogFooter className="mt-4">
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        {!state.data && !pending && <Button type="submit">Verify Now</Button>}
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}


export function QuizClient({ questions }: { questions: Question[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleNext = () => {
    setDirection(1);
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };
  
  const handleAnswerSubmit = () => {
    if (!selectedAnswer || isAnswered) return;
    
    setIsAnswered(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(prevScore => prevScore + 1);
    }
  };

  const handleRestart = () => {
    // This will reload the page to go back to the setup form
    window.location.reload();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      position: 'absolute'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: 'relative'
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      position: 'absolute'
    }),
  };

  if (showResult) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
        <Card className="text-center p-8">
            <CardHeader>
            <CardTitle className="font-headline text-3xl">Quiz Completed! 🥳</CardTitle>
            <CardDescription>You've reached the end of the quiz.</CardDescription>
            </CardHeader>
            <CardContent>
            <p className="text-2xl mb-4">
                Your final score is: <span className="font-bold text-primary">{score}</span> out of {questions.length}
            </p>
            <Button onClick={handleRestart}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Create a New Quiz
            </Button>
            </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <Card className="overflow-hidden relative min-h-[500px]">
        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="rounded-none" />
        <AnimatePresence initial={false} custom={direction}>
            <motion.div
                key={currentQuestionIndex}
                className="w-full"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                }}
            >
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">
                    Question {currentQuestionIndex + 1}
                    </CardTitle>
                    <CardDescription className="text-lg pt-2 min-h-[56px]">{currentQuestion.question}</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={selectedAnswer || ""}
                        onValueChange={setSelectedAnswer}
                        disabled={isAnswered}
                        className="space-y-4"
                    >
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className={cn(
                        "flex items-center space-x-3 p-3 rounded-md border transition-all cursor-pointer",
                        "border-muted/50 hover:border-primary/50",
                        isAnswered && (option === currentQuestion.correctAnswer ? "bg-green-500/20 border-green-500" : ""),
                        isAnswered && (option === selectedAnswer && option !== currentQuestion.correctAnswer ? "bg-red-500/20 border-red-500" : "")
                        )}>
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="text-base flex-1 cursor-pointer">{option}</Label>
                        </div>
                    ))}
                    </RadioGroup>

                    <div className="mt-6 flex justify-end">
                        {isAnswered ? (
                            <Button onClick={handleNext}>
                            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                        </Button>
                        ) : (
                            <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
                                Submit Answer
                            </Button>
                        )}
                    </div>
                    
                     <AnimatePresence>
                        {isAnswered && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                <Alert className={cn("mt-6 border-2", isCorrect ? "border-green-500/50" : "border-red-500/50")}>
                                    {isCorrect ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                                <AlertTitle className={cn("font-bold", isCorrect ? "text-green-600" : "text-red-600")}>{isCorrect ? "Correct! ✅" : "Incorrect ❌"}</AlertTitle>
                                <AlertDescription>
                                    {currentQuestion.explanation}
                                </AlertDescription>
                                </Alert>
                                {!isCorrect && selectedAnswer && (
                                   <>
                                        <Button variant="ghost" size="sm" className="mt-2 text-xs h-auto py-1 px-2" onClick={() => setIsVerifyDialogOpen(true)}>
                                            <HelpCircle className="mr-2 h-3 w-3" />
                                            Think this is wrong? Verify with AI
                                        </Button>
                                        <VerifyDialog 
                                            question={currentQuestion} 
                                            userSuggestedAnswer={selectedAnswer}
                                            open={isVerifyDialogOpen}
                                            onOpenChange={setIsVerifyDialogOpen}
                                        />
                                   </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </motion.div>
        </AnimatePresence>
    </Card>
  );
}
