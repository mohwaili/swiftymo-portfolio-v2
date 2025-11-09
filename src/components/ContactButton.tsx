"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function ContactButton() {
  return (
    <motion.div className="relative">
      {/* Pulsing glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-accent/20"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <Link href="/contact">
        <Button className="relative">Contact</Button>
      </Link>
    </motion.div>
  );
}
