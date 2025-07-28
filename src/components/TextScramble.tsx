"use client";
import { useRef } from "react";
import { gsap } from "gsap";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";

export default function TextScramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const displayText = text.toUpperCase();

  function scramble() {
    if (!ref.current) return;
    const el = ref.current;
    const original = displayText;
    let frame = 0;
    const scrambleChars = chars.split("");
    let interval: number;

    function update() {
      let displayed = "";
      for (let i = 0; i < original.length; i++) {
        if (i < frame) {
          displayed += original[i];
        } else {
          displayed += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }
      el.textContent = displayed;
      frame++;
      if (frame <= original.length) {
        interval = window.setTimeout(update, 70); // Slower stagger
      } else {
        el.textContent = original;
      }
    }
    update();
    return () => clearTimeout(interval);
  }

  return (
    <span
      ref={ref}
      className={className}
      tabIndex={0}
      onMouseEnter={scramble}
      onFocus={scramble}
      style={{ cursor: "pointer", display: "inline-block" }}
    >
      {displayText}
    </span>
  );
} 