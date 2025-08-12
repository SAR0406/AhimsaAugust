
"use client";

import { useRef, useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { State } from '@/app/history/actions';
import { Button } from './ui/button';
import { Loader, BookOpen } from 'lucide-react';
import Image from 'next/image';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from './ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface HistoryItem {
    year: string;
    title: string;
    description: string;
    image: string;
    hint: string;
}

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="mt-4 w-full sm:w-auto">
            {pending ? (
                <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Thinking...
                </>
            ) : (
                <>
                 <BookOpen className="mr-2 h-4 w-4" />
                 Tell me more
                </>
            )}
        </Button>
    );
};

interface TimelineItemProps {
  item: HistoryItem;
  index: number;
  getMoreInfoAction: (prevState: State, formData: FormData) => Promise<State>;
}

const TimelineItem = ({ item, index, getMoreInfoAction }: TimelineItemProps) => {
    const isLeft = index % 2 === 0;

    const initialState: State = { message: null };
    const [state, formAction] = useActionState(getMoreInfoAction, initialState);
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if(state.data?.moreInfo) {
            setIsDialogOpen(true);
        }
        if(state.message && !state.data) {
             toast({
                variant: "destructive",
                title: "AI Error",
                description: state.message,
            });
        }
    }, [state, toast]);

    const variants = {
        hidden: { opacity: 0, x: isLeft ? -100 : 100 },
        visible: { opacity: 1, x: 0 }
    };
    
    const colors = ['bg-primary', 'bg-accent', 'bg-green-500', 'bg-red-500'];
    const dotColor = colors[index % colors.length];

    return (
        <motion.div
            variants={variants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn("relative w-full flex", isLeft ? "justify-start" : "justify-end")}
        >
            <div className={cn("w-1/2 px-4", isLeft ? "pr-8" : "pl-8")}>
                <Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1.5 glow-on-hover overflow-hidden">
                     <div className="relative w-full h-40">
                         <Image
                            src={item.image}
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                            className="brightness-90"
                            data-ai-hint={item.hint}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                         <p className={cn("absolute bottom-2 right-4 text-2xl font-bold text-white font-headline drop-shadow-lg")}>{item.year}</p>
                     </div>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                        <CardDescription className="pt-1">{item.description}</CardDescription>
                        <form action={formAction} className="pt-2">
                             <input type="hidden" name="year" value={item.year} />
                             <input type="hidden" name="title" value={item.title} />
                             <input type="hidden" name="description" value={item.description} />
                             <SubmitButton />
                        </form>
                    </CardHeader>
                </Card>
            </div>
             <div className="absolute top-5 h-4 w-4 rounded-full border-4 border-background z-10 left-1/2 -translate-x-1/2">
                <div className={cn("h-full w-full rounded-full", dotColor)}></div>
            </div>
             <div className={cn("absolute top-7 w-1/2 h-0.5", isLeft ? "right-1/2" : "left-1/2", dotColor)}></div>
            
            {state.data && (
                 <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="font-headline text-2xl text-primary">{state.data.title} ({state.data.year})</AlertDialogTitle>
                            <AlertDialogDescription className="text-base text-left pt-2 max-h-[50vh] overflow-y-auto">
                               {state.data.moreInfo}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </motion.div>
    );
}

interface TimelineProps {
  items: HistoryItem[];
  className?: string;
  getMoreInfoAction: (prevState: State, formData: FormData) => Promise<State>;
}

export function Timeline({ items, className, getMoreInfoAction }: TimelineProps) {
  return (
    <div className={cn("relative flex flex-col items-center space-y-8 py-4", className)}>
      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
      {items.map((item, index) => (
        <TimelineItem key={index} item={item} index={index} getMoreInfoAction={getMoreInfoAction} />
      ))}
    </div>
  );
}
