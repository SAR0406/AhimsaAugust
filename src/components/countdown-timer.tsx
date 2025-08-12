
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PartyPopper, TimerIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const TimeBox = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center gap-2 p-2 sm:p-4 rounded-lg bg-muted/50 w-24">
    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-mono tracking-widest">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-xs sm:text-sm md:text-base text-muted-foreground uppercase tracking-wider">{label}</div>
  </div>
);

type CountdownTimerProps = {
    onCountdownEnd: () => void;
    onPreview?: () => void;
};

const CountdownLoader = () => (
    <div className="flex justify-center items-center gap-2 sm:gap-4">
        <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-20 w-24 sm:h-28 sm:w-24" />
        </div>
        <div className="text-3xl md:text-5xl text-muted-foreground/50 pb-8">:</div>
         <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-20 w-24 sm:h-28 sm:w-24" />
        </div>
        <div className="text-3xl md:text-5xl text-muted-foreground/50 pb-8">:</div>
        <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-20 w-24 sm:h-28 sm:w-24" />
        </div>
        <div className="text-3xl md:text-5xl text-muted-foreground/50 pb-8">:</div>
         <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-20 w-24 sm:h-28 sm:w-24" />
        </div>
    </div>
);


export function CountdownTimer({ onCountdownEnd, onPreview }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isFinished, setIsFinished] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [showWishes, setShowWishes] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const timer = setInterval(() => {
            const now = new Date();
            const nowInKolkata = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

            let targetDate = new Date(nowInKolkata.getFullYear(), 7, 15, 0, 0, 0); // August is month 7
            
            const isIndependenceDay = nowInKolkata.getMonth() === 7 && nowInKolkata.getDate() === 15;

            if (isIndependenceDay) {
                setIsFinished(true);
                setShowWishes(true);
                onCountdownEnd();
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
                return;
            }

            if (nowInKolkata > targetDate) {
                targetDate.setFullYear(targetDate.getFullYear() + 1);
            }
            
            const difference = targetDate.getTime() - nowInKolkata.getTime();

            if (difference <= 0) {
                 setIsFinished(true);
                 setShowWishes(true);
                 onCountdownEnd();
                 setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                 clearInterval(timer);
                 return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [onCountdownEnd]);

    if (!isMounted) {
        return <CountdownLoader />;
    }

    if (isFinished) {
        return (
            <>
            <AlertDialog open={showWishes} onOpenChange={setShowWishes}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-headline text-3xl text-center text-accent">
                            <PartyPopper className="h-10 w-10 mx-auto mb-4" />
                            Happy Independence Day!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-lg">
                            Wishing you a day filled with patriotism, peace, and pride.
                            <br />
                            The "Celebrate Now!" button below is now unlocked. Click it to continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Close</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
             <Card className="shadow-lg border-accent/50 dark:glassmorphism">
                <CardHeader className="flex flex-row items-center justify-center gap-4 text-center pb-2">
                    <PartyPopper className="h-8 w-8 text-accent" />
                    <CardTitle className="font-headline text-3xl md:text-4xl text-accent">Happy Independence Day!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-lg text-muted-foreground">Wishing everyone a day of peace, joy, and national pride.</p>
                </CardContent>
            </Card>
            </>
        )
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex justify-center items-center gap-2 sm:gap-4 p-4 rounded-xl dark:glassmorphism bg-muted/20 border">
                    <TimeBox value={timeLeft.days} label="Days" />
                    <div className="text-3xl md:text-5xl text-muted-foreground/50 pb-8 animate-pulse">:</div>
                    <TimeBox value={timeLeft.hours} label="Hours" />
                    <div className="text-3xl md:text-5xl text-muted-foreground/50 pb-8 animate-pulse">:</div>
                    <TimeBox value={timeLeft.minutes} label="Minutes" />
                    <div className="text-3xl md:text-5xl text-muted-foreground/50 pb-8 animate-pulse">:</div>
                    <TimeBox value={timeLeft.seconds} label="Seconds" />
            </div>
             <button
                onClick={onPreview}
                className="p-0 text-sm text-muted-foreground hover:text-primary underline"
            >
                Click here for a flower shower preview
            </button>
        </div>
    );
}
