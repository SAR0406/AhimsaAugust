
"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

interface ImageProps {
  src: string;
  alt: string;
  description: string;
  hint: string;
}

export function GalleryClient({ images }: { images: ImageProps[] }) {
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

  return (
    <>
      <div 
        className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <Card className="overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div 
                        className="text-white"
                    >
                        <Eye className="w-8 h-8 mb-2 drop-shadow-lg"/>
                        <p className="font-semibold text-lg drop-shadow-md">{image.description}</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-4">
          {selectedImage && (
            <div 
              className="flex flex-col items-center"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto object-contain max-h-[80vh] rounded-lg"
                data-ai-hint={selectedImage.hint}
              />
              <p className="mt-4 text-lg font-headline text-center">{selectedImage.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
