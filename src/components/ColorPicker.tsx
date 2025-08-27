import { Button } from "@/components/ui/button";
import { ScreenshotConfig } from "@/types/screenshot";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({ color, setConfig, config }: { color: string; setConfig: (config: ScreenshotConfig) => void; config: ScreenshotConfig }) {
    return <Button size="icon" variant="outline" style={{ backgroundColor: color }} />;
}

{
    /* <HexColorPicker color={color} onChange={(color) => setConfig({ ...config, backgroundColor: color })} /> */
}
