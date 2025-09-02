"use client";

import { useEffect, useState } from "react";
import CodePreview from "@/components/CodePreview";
import { ScreenshotConfig } from "@/types/screenshot";
import Toolbar from "@/components/Toolbar";
import GridBackground from "@/components/GridBackground";
import Titlebar from "@/components/Titlebar";
import { HellishCreativeAd } from "@/components/HellishCreativeAd";
import { macosWindowControls } from "@/lib/windowControls";
import { useToPng } from "@hugocxl/react-to-image";
import { toast } from "sonner";
import { motion } from "motion/react";
import { githubDarkTheme, githubLightTheme } from "@/lib/themes/github-themes";
import { useSystemThemeContext } from "@/contexts/ThemeContext";
import { CodeWindowTheme } from "@/types/theme";

export default function Home() {
    const [isExporting, setIsExporting] = useState(false);
    const { initialTheme } = useSystemThemeContext();
    const [config, setConfig] = useState<ScreenshotConfig>({
        language: "javascript",
        theme: githubDarkTheme,
        windowControlsTheme: macosWindowControls,
        padding: 16,
        windowWidth: 400,
        backgroundPadding: 40,
        backgroundColor: "#040c14",
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

    // Set code window theme and background color based on initial system theme
    useEffect(() => {
        let theme: CodeWindowTheme, backgroundColor: string;
        switch (initialTheme) {
            case "light":
                theme = githubLightTheme;
                backgroundColor = "#d6d7e0";
                break;
            case "dark":
                theme = githubDarkTheme;
                backgroundColor = "#040c14";
                break;
        }
        // Set config with new theme and background color
        setConfig((prev) => ({ ...prev, theme: theme, backgroundColor }));
    }, [initialTheme]);

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
        <motion.div className="flex h-screen bg-gray-100 dark:bg-zinc-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GridBackground className="fixed inset-0 mask-radial-from-0% mask-radial-to-90% mask-radial-at-center mask-cover text-[#d7d9db] dark:text-zinc-800" />
            <Toolbar config={config} setConfig={setConfig} onExport={handleExport} />

            {/* Always visible - user interacts with this */}
            <CodePreview config={config} setConfig={setConfig} codeWindowRef={ref} exportMode={isExporting} />

            <Titlebar />
            <HellishCreativeAd className="w-[230px] absolute top-12 right-12" />
        </motion.div>
    );
}
