
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createQuote, type State } from "@/app/quote-generator/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Loader, Wand2, Image as ImageIcon, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Quote
        </>
      )}
    </Button>
  );
}

export function QuoteGeneratorClient() {
  const initialState: State = { message: null, errors: {}, quote: null };
  const [state, dispatch] = useActionState(createQuote, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (state.message && !state.quote) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
    if (state.quote) {
      // Don't reset the form, so the image preview remains
    }
  }, [state, toast]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        setPreviewUrl(null);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <form ref={formRef} action={dispatch}>
          <CardHeader>
            <CardTitle className="font-headline">Upload Your Photo</CardTitle>
            <CardDescription>
              Select an image and our AI will craft a patriotic caption for it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {previewUrl ? (
                <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                    <Image src={previewUrl} alt="Image preview" layout="fill" objectFit="contain" />
                </div>
             ) : (
                <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg text-muted-foreground">
                    <Upload className="h-10 w-10 mb-2" />
                    <p>Image Preview</p>
                </div>
             )}
            <div className="space-y-2">
              <Label htmlFor="image">Select Image</Label>
               <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="focus-glow"
              />
            </div>
            {state.errors?.image && (
              <div className="text-sm font-medium text-destructive">
                {state.errors.image.join(", ")}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.quote && previewUrl && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot className="h-6 w-6 text-primary"/> AI's Suggestion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                <Image src={previewUrl} alt="Generated quote image" layout="fill" objectFit="contain" />
            </div>
            <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
                "{state.quote}"
            </blockquote>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
