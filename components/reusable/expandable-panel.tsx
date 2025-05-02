"use client";

import { usePanelSlice } from "@/features/personal/student/hooks/use-expandable-panel";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Icon } from "./icon";

export const ExpandablePanel = () => {
  const { open, component, closePanel } = usePanelSlice();

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-black/70 cursor-pointer backdrop-blur-sm"
            onClick={closePanel}
          />

          <motion.div
            key="content"
            className="fixed z-[51] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex items-center justify-center relative">
              {component}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
