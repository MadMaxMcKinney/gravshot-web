import CodeWindowControls from "@/components/CodeWindowControls";
import { CodeWindowControlsTheme } from "@/types/controls";
import { CodeWindowTheme } from "@/types/theme";
import { motion } from "motion/react";

interface CodeWindowProps {
    fileName: string;
    children: React.ReactNode;
    windowWidth: number;
    theme: CodeWindowTheme;
    windowControlsTheme: CodeWindowControlsTheme;
}

export default function CodeWindow({ fileName, children, windowWidth, theme, windowControlsTheme }: CodeWindowProps) {
    const themeConfig = theme;

    return (
        <motion.div
            className={"rounded-lg shadow-2xl overflow-hidden"}
            style={{
                width: windowWidth,
                backgroundColor: themeConfig.window.background,
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
        >
            <div
                className="flex items-center justify-between px-4 py-3"
                style={{
                    backgroundColor: themeConfig.window.titlebar,
                    borderBottom: `1px solid ${themeConfig.window.border}`,
                }}
            >
                <CodeWindowControls windowControlsTheme={windowControlsTheme} />

                <div className="text-sm font-medium" style={{ color: themeConfig.window.text }}>
                    {fileName}
                </div>

                <div className="w-16"></div>
            </div>

            <div>{children}</div>
        </motion.div>
    );
}
