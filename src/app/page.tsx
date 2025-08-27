"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CodePreview from "@/components/CodePreview";
import { ScreenshotConfig } from "@/types/screenshot";
import Toolbar from "@/components/Toolbar";
import GridBackground from "@/components/GridBackground";

export default function Home() {
    const [config, setConfig] = useState<ScreenshotConfig>({
        language: "javascript",
        theme: "vs-dark",
        padding: 16,
        windowWidth: 400,
        backgroundPadding: 40,
        backgroundColor: "#1e293b",
        backgroundImage: null,
        fileName: "example.js",
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
        showDragControls: true,
    });

    return (
        <div className="flex h-screen bg-gray-100">
            <GridBackground className="fixed inset-0 mask-radial-from-0% mask-radial-to-100% mask-radial-at-center mask-cover" />
            <Toolbar config={config} setConfig={setConfig} />
            <CodePreview config={config} setConfig={setConfig} />
        </div>
    );
}
