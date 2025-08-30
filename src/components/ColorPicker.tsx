import { Button } from "@/components/ui/button";
import { ScreenshotConfig } from "@/types/screenshot";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({ color, setConfig, config, className }: { color: string; setConfig: (config: ScreenshotConfig) => void; config: ScreenshotConfig; className?: string }) {
    return <Button size="icon" variant="outline" style={{ backgroundColor: color }} className={className} />;
}

{
    /* <HexColorPicker color={color} onChange={(color) => setConfig({ ...config, backgroundColor: color })} /> */
}
