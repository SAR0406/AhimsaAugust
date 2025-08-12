
"use client";

import { PageHeader } from "@/components/page-header";
import { Timeline } from "@/components/timeline";
import { HISTORY_DATA } from "@/lib/constants";
import { History as HistoryIcon } from "lucide-react";
import { getMoreInfoAction } from "@/app/history/actions";
import { motion } from "framer-motion";

export default function HistoryPage() {

   const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="w-full">
      <PageHeader
        icon={<HistoryIcon className="h-10 w-10 text-primary" />}
        title="A Journey Through Time ⏳"
        description="Explore the key milestones and pivotal moments that shaped India's path to freedom. Click 'Tell me more' to get AI-powered details about each event!"
      />

      <motion.div 
        className="space-y-8 max-w-5xl mx-auto bg-card p-4 md:p-8 rounded-lg shadow-inner border"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Timeline items={HISTORY_DATA} getMoreInfoAction={getMoreInfoAction} />
      </motion.div>
    </div>
  );
}
