import React from "react";
import "./ScrollComponents.css";

interface VerticalScrollProps {
  children: React.ReactNode;
}

export const VerticalScroll = React.forwardRef<
  HTMLDivElement,
  VerticalScrollProps
>(({ children }, ref) => {
  return (
    <div ref={ref} className="vertical-scroll-container">
      <div className="vertical-scroll-content">{children}</div>
    </div>
  );
});

VerticalScroll.displayName = "VerticalScroll";
