
"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { BookOpen, Camera, Flag, HelpCircle, History, Quote, Wand2, Upload, MessageSquare, Brush } from "lucide-react"

const components: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
  {
    title: "History ⏳",
    href: "/history",
    description: "Explore the key milestones of the freedom struggle.",
    icon: <History className="h-5 w-5" />
  },
  {
    title: "Facts 💡",
    href: "/facts",
    description: "Uncover fascinating facts about India's independence.",
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    title: "Gallery 🖼️",
    href: "/gallery",
    description: "A visual journey through vibrant celebrations.",
    icon: <Camera className="h-5 w-5" />
  },
  {
    title: "Quotes 📜",
    href: "/quotes",
    description: "Inspiring words from the architects of independence.",
    icon: <Quote className="h-5 w-5" />
  },
]

const interactive: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
    {
        title: "The Independence Quiz ❓",
        href: "/quiz",
        description: "Test your knowledge about the freedom struggle.",
        icon: <HelpCircle className="h-5 w-5" />
    },
    {
        title: "Flag Hoisting Ceremony 🇮🇳",
        href: "/flag-hoisting",
        description: "Learn about the significance of our national flag.",
        icon: <Flag className="h-5 w-5" />
    },
    {
        title: "Hoist The Flag 🚀",
        href: "/interactive-flag",
        description: "An interactive flag hoisting ceremony experience.",
        icon: <Upload className="h-5 w-5" />
    }
]

const ai_tools: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
    {
        title: "AI Freedom Story Narrator 📖",
        href: "/story-narrator",
        description: "Ask our AI to tell you a story about India's history.",
        icon: <MessageSquare className="h-5 w-5" />
    },
    {
        title: "AI Art Generator 🎨",
        href: "/art-generator",
        description: "Let AI create a unique artwork from a famous quote.",
        icon: <Brush className="h-5 w-5" />
    },
    {
        title: "AI Quote Generator ✨",
        href: "/quote-generator",
        description: "Upload an image to get a patriotic caption.",
        icon: <Wand2 className="h-5 w-5" />
    },
]

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Interactive</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Flag className="h-10 w-10 text-primary" />
                    <div className="mb-2 mt-4 text-lg font-medium font-headline">
                      Ahimsa House
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      An interactive celebration of India's Independence Day.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {interactive.map((item) => (
                   <ListItem
                   key={item.title}
                   title={item.title}
                   href={item.href}
                   icon={item.icon}
                 >
                   {item.description}
                 </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>AI Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {ai_tools.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
            <div className="flex items-center gap-2">
                {icon}
                <div className="text-sm font-medium leading-none">{title}</div>
            </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
