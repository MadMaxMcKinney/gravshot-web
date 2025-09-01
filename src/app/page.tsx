"use client";

import { useState } from "react";
import CodePreview from "@/components/CodePreview";
import { ScreenshotConfig } from "@/types/screenshot";
import Toolbar from "@/components/Toolbar";
import GridBackground from "@/components/GridBackground";
import Titlebar from "@/components/Titlebar";
import { HellishCreativeAd } from "@/components/HellishCreativeAd";
import { vsDarkTheme } from "@/lib/themes/vs-themes";
import { macosWindowControls } from "@/lib/windowControls";
import { useToPng } from "@hugocxl/react-to-image";
import { toast } from "sonner";

export default function Home() {
    const [isExporting, setIsExporting] = useState(false);
    const [config, setConfig] = useState<ScreenshotConfig>({
        language: "javascript",
        theme: vsDarkTheme,
        windowControlsTheme: macosWindowControls,
        padding: 16,
        windowWidth: 400,
        backgroundPadding: 40,
        backgroundColor: "#1e293b",
        backgroundImage: null,
        fileName: "example.js",
        showDragControls: true,
        backgroundType: "color",
        code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
    });

    const [state, convertToPng, ref] = useToPng<HTMLDivElement>({
        onSuccess: (data) => {
            const link = document.createElement("a");
            link.href = data;
            link.download = `gravshot-code-screenshot.png`;
            link.click();
            link.remove();
            toast.success("Image exported!");
            setIsExporting(false); // Clean up after successful export
        },
        onError: (error) => {
            console.error("Export failed:", error);
            toast.error("Export failed. Please try again.");
            setIsExporting(false); // Clean up after failed export
        },
    });

    const handleExport = () => {
        setIsExporting(true);
        convertToPng();
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <GridBackground className="fixed inset-0 mask-radial-from-0% mask-radial-to-90% mask-radial-at-center mask-cover" />
            <Toolbar config={config} setConfig={setConfig} onExport={handleExport} />

            {/* Always visible - user interacts with this */}
            <CodePreview config={config} setConfig={setConfig} codeWindowRef={ref} exportMode={isExporting} />

            <Titlebar />
            <HellishCreativeAd className="w-[230px] absolute top-12 right-12" />
        </div>
    );
}
