"use client";

import { useState, useRef, useCallback } from "react";

interface DragHandleProps {
    type: "windowWidth" | "padding" | "backgroundPadding";
    direction?: "horizontal" | "vertical";
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    className?: string;
}

export default function DragHandle({ type, value, onChange, min, max, className = "", direction = "horizontal" }: DragHandleProps) {
    const [isDragging, setIsDragging] = useState(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const startValueRef = useRef(0);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            setIsDragging(true);
            startXRef.current = e.clientX;
            startYRef.current = e.clientY;
            startValueRef.current = value;

            const handleMouseMove = (e: MouseEvent) => {
                const deltaX = e.clientX - startXRef.current;
                const deltaY = -(e.clientY - startYRef.current);
                let deltaValue;
                switch (direction) {
                    case "horizontal":
                        deltaValue = deltaX;
                        break;
                    case "vertical":
                        deltaValue = deltaY;
                        break;
                }
                const sensitivity = type === "windowWidth" ? 1 : 0.5;
                const newValue = Math.max(min, Math.min(max, startValueRef.current + deltaValue * sensitivity));
                onChange(Math.round(newValue));
            };

            const handleMouseUp = () => {
                setIsDragging(false);
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [value, onChange, min, max, type]
    );

    return (
        <div
            className={`
        absolute flex items-center justify-center bg-zinc-400
        rounded-xl h-2 min-w-12 select-none transition-all duration-200
        hover:bg-zinc-500 hover:scale-105 z-10 shadow-lg
        ${isDragging ? "bg-zinc-600 scale-105" : ""} ${direction === "vertical" ? "cursor-ns-resize" : "cursor-ew-resize rotate-90"}
        ${className}
      `}
            onMouseDown={handleMouseDown}
        ></div>
    );
}
