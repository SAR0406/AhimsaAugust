
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PageHeaderProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

export function PageHeader({ icon, title, description, className }: PageHeaderProps) {
    return (
        <div className={cn("text-center mb-8 md:mb-12", className)}>
             <motion.div 
                className="mx-auto bg-gradient-to-br from-primary/20 to-primary/5 p-3 md:p-4 rounded-full w-max mb-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
             >
                {icon}
             </motion.div>
            <motion.h1 
                className="text-3xl md:text-5xl font-headline font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {title}
            </motion.h1>
            <motion.p 
                className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {description}
            </motion.p>
        </div>
    );
}
