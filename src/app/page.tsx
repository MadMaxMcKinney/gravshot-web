"use client";

import { useState } from "react";
import CodePreview from "@/components/CodePreview";
import { ScreenshotConfig } from "@/types/screenshot";
import Toolbar from "@/components/Toolbar";
import GridBackground from "@/components/GridBackground";
import Titlebar from "@/components/Titlebar";
import { HellishCreativeAd } from "@/components/HellishCreativeAd";
import { vsDarkTheme } from "@/lib/themes/vs-themes";

export default function Home() {
    const [config, setConfig] = useState<ScreenshotConfig>({
        language: "javascript",
        theme: vsDarkTheme,
        padding: 16,
        windowWidth: 400,
        backgroundPadding: 40,
        backgroundColor: "#1e293b",
        backgroundImage: null,
        fileName: "example.js",
        showDragControls: true,
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
    });

    return (
        <div className="flex h-screen bg-gray-100">
            <GridBackground className="fixed inset-0 mask-radial-from-0% mask-radial-to-90% mask-radial-at-center mask-cover" />
            <Toolbar config={config} setConfig={setConfig} />
            <CodePreview config={config} setConfig={setConfig} />
            <Titlebar />
            <HellishCreativeAd className="w-[230px] absolute top-12 right-12" />
        </div>
    );
}
