"use client";

import { useState, useRef, useCallback } from "react";

interface DragHandleProps {
    type: "windowWidth" | "backgroundPadding";
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    className?: string;
}

export default function DragHandle({ type, value, onChange, min, max, className = "" }: DragHandleProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
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
                const deltaValue = deltaX + deltaY;
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

    const getLabel = () => {
        switch (type) {
            case "windowWidth":
                return `Width: ${value}px`;
            case "backgroundPadding":
                return `Padding: ${value}px`;
            default:
                return `${value}px`;
        }
    };

    return (
        <div className={`absolute z-10 p-4 cursor-move ${className}`} onMouseDown={handleMouseDown} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {/* Visual indicator */}
            <div
                className={`
                    flex items-center justify-center border border-border text-foreground text-xs font-medium
                    rounded-full select-none transition-all duration-200 shadow-lg
                    ${isDragging ? "bg-muted" : ""}
                    ${isHovering || isDragging ? "bg-muted w-auto h-6 px-3 py-1" : "w-3 h-3 bg-zinc-400 dark:bg-zinc-600"}
                `}
            >
                {(isHovering || isDragging) && <span className="whitespace-nowrap">{getLabel()}</span>}
            </div>
        </div>
    );
}
