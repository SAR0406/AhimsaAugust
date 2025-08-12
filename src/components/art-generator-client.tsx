
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { createArt, type State } from "@/app/art-generator/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ImageIcon, Loader, Brush } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QUOTES_DATA } from "@/lib/constants";
import { Skeleton } from "./ui/skeleton";
import type { FormEvent } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Painting...
        </>
      ) : (
        <>
          <Brush className="mr-2 h-4 w-4" />
          Generate Art
        </>
      )}
    </Button>
  );
}

export function ArtGeneratorClient() {
  const initialState: State = { message: null, errors: {}, imageUrl: null };
  const [state, dispatch] = useActionState(createArt, initialState);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const formAction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    dispatch(formData);
  };


  useEffect(() => {
    if (state.message && !state.imageUrl) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <form action={dispatch}>
          <CardHeader>
            <CardTitle className="font-headline">Select a Quote</CardTitle>
            <CardDescription>
              Choose an inspiring quote to serve as the muse for our AI artist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quote">Inspirational Quote</Label>
               <Select name="quote" required>
                <SelectTrigger className="focus-glow h-auto text-wrap">
                    <SelectValue placeholder="Select a quote..." />
                </SelectTrigger>
                <SelectContent>
                    {QUOTES_DATA.map((item, index) => (
                      <SelectItem key={index} value={item.quote}>
                        <div className="flex flex-col">
                            <span className="font-semibold">"{item.quote}"</span>
                            <span className="text-xs text-muted-foreground">- {item.author}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            </div>
            {state.errors?.quote && (
              <div className="text-sm font-medium text-destructive">
                {state.errors.quote.join(", ")}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
       {(pending || state.imageUrl) && (
         <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <ImageIcon className="h-6 w-6 text-primary"/> AI Masterpiece
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-square rounded-md overflow-hidden border">
                {pending ? (
                     <div className="flex flex-col items-center justify-center w-full h-full bg-muted/50">
                        <Skeleton className="h-full w-full" />
                        <p className="absolute text-muted-foreground font-semibold">The AI is painting, please wait...</p>
                     </div>
                ) : state.imageUrl && (
                    <Image
                        src={state.imageUrl}
                        alt="AI generated art"
                        layout="fill"
                        objectFit="contain"
                    />
                )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
