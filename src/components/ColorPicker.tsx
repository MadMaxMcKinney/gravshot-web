import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScreenshotConfig } from "@/types/screenshot";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker({ color, setConfig, config, className }: { color: string; setConfig: (config: ScreenshotConfig) => void; config: ScreenshotConfig; className?: string }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="icon" variant="outline" style={{ backgroundColor: color }} className={className + " shadow-xs"} />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-1 rounded-xl">
                <HexColorPicker color={color} onChange={(color) => setConfig({ ...config, backgroundColor: color })} />
            </PopoverContent>
        </Popover>
    );
}
