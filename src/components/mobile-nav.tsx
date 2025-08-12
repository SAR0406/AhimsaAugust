
"use client"

import React, { useState } from "react";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Flag, BookOpen, Camera, Quote, HelpCircle, Upload, MessageSquare, Brush, History as HistoryIcon, Wand2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

const mainNav = [
  {
    title: "History",
    href: "/history",
    icon: <HistoryIcon className="h-5 w-5" />
  },
  {
    title: "Facts",
    href: "/facts",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: <Camera className="h-5 w-5" />
  },
  {
    title: "Quotes",
    href: "/quotes",
    icon: <Quote className="h-5 w-5" />
  },
]

const interactiveNav = [
    {
        title: "The Independence Quiz",
        href: "/quiz",
        icon: <HelpCircle className="h-5 w-5" />
    },
    {
        title: "Flag Hoisting Ceremony",
        href: "/flag-hoisting",
        icon: <Flag className="h-5 w-5" />
    },
    {
        title: "Hoist The Flag",
        href: "/interactive-flag",
        icon: <Upload className="h-5 w-5" />
    }
]

const aiToolsNav = [
    {
        title: "AI Freedom Story Narrator",
        href: "/story-narrator",
        icon: <MessageSquare className="h-5 w-5" />
    },
    {
        title: "AI Art Generator",
        href: "/art-generator",
        icon: <Brush className="h-5 w-5" />
    },
    {
        title: "AI Quote Generator",
        href: "/quote-generator",
        icon: <Wand2 className="h-5 w-5" />
    },
]


export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Flag className="mr-2 h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Ahimsa House</span>
        </MobileLink>
         <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
                 <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']} className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-sm capitalize">Explore</AccordionTrigger>
                        <AccordionContent>
                           <div className="flex flex-col space-y-2">
                            {mainNav.map(
                                (item) =>
                                item.href && (
                                    <MobileLink
                                        key={item.href}
                                        href={item.href}
                                        onOpenChange={setOpen}
                                        className="flex items-center gap-2"
                                    >
                                        {item.icon}
                                        {item.title}
                                    </MobileLink>
                                )
                            )}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-sm capitalize">Interactive</AccordionTrigger>
                        <AccordionContent>
                           <div className="flex flex-col space-y-2">
                            {interactiveNav.map(
                                (item) =>
                                item.href && (
                                    <MobileLink
                                        key={item.href}
                                        href={item.href}
                                        onOpenChange={setOpen}
                                        className="flex items-center gap-2"
                                    >
                                        {item.icon}
                                        {item.title}
                                    </MobileLink>
                                )
                            )}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-3">
                        <AccordionTrigger className="text-sm capitalize">AI Tools</AccordionTrigger>
                        <AccordionContent>
                           <div className="flex flex-col space-y-2">
                            {aiToolsNav.map(
                                (item) =>
                                item.href && (
                                    <MobileLink
                                        key={item.href}
                                        href={item.href}
                                        onOpenChange={setOpen}
                                        className="flex items-center gap-2"
                                    >
                                        {item.icon}
                                        {item.title}
                                    </MobileLink>
                                )
                            )}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
