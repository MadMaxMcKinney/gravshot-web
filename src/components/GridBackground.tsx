"use client";

import { CSSProperties } from "react";

interface GridBackgroundProps {
    gridSize?: number;
    gridLineColor?: string;
    gridLineWidth?: number;
    backgroundColor?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function GridBackground({ gridSize = 30, gridLineColor = "#d7d9db", gridLineWidth = 1, backgroundColor = "transparent", className = "", children }: GridBackgroundProps) {
    const gridStyle: CSSProperties = {
        backgroundColor,
        backgroundImage: `
      linear-gradient(to right, ${gridLineColor} ${gridLineWidth}px, transparent ${gridLineWidth}px),
      linear-gradient(to bottom, ${gridLineColor} ${gridLineWidth}px, transparent ${gridLineWidth}px)
    `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
    };

    return (
        <div className={`w-full h-full ${className}`} style={gridStyle}>
            {children}
        </div>
    );
}
