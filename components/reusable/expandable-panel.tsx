"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";

interface ExpandablePanelProps {
  children: React.ReactNode;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  triggerElement?: React.ReactNode;
}

export function ExpandablePanel({
  children,
  isExpanded,
  setIsExpanded,
  triggerElement,
}: ExpandablePanelProps) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0, pointerEvents: "none" }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          pointerEvents: isExpanded ? "auto" : "none",
        }}
        onClick={() => setIsExpanded(false)}
      />

      {!isExpanded && (
        <div onClick={() => setIsExpanded(true)}>{triggerElement}</div>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed z-50 overflow-hidden"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              width: "90vw",
              height: "90vh",
              top: "5vh",
              left: "5vw",
            }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Conteúdo personalizado */}
            <div className="relative h-full grid place-items-center">
              {children}

              {/* Botão de fechar */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
