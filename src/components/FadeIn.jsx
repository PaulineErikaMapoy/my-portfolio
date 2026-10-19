// src/components/FadeIn.jsx
// Plain wrapper. Scroll animations now happen per element (see src/useScrollReveal.js),
// so sections no longer fade in as one big block.
import React from "react";

export default function FadeIn({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
