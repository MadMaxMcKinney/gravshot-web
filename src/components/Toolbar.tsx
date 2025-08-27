import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getThemeList } from "@/lib/themes";
import { ScreenshotConfig } from "@/types/screenshot";
import { Code } from "lucide-react";

interface ToolbarProps {
    config: ScreenshotConfig;
    setConfig: (config: ScreenshotConfig) => void;
}

export default function Toolbar({ config, setConfig }: ToolbarProps) {
    const themes = getThemeList();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setConfig({
                    ...config,
                    backgroundImage: e.target?.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const clearBackgroundImage = () => {
        setConfig({
            ...config,
            backgroundImage: null,
        });
    };

    return (
        <footer className="fixed bottom-12 left-0 right-0 flex justify-center">
            <div className="rounded-xl shadow-lg px-3 py-3 bg-background border border-border flex gap-4">
                <Input type="text" placeholder="file_name.js" onChange={(e) => setConfig({ ...config, fileName: e.target.value })} className="max-w-40" />
                {/* Code settings */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button size="icon" variant="outline">
                            <Code />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="leading-none font-medium">Code settings</h4>
                                <p className="text-muted-foreground text-sm">Set the language and syntax highlighting for the code block.</p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label>Syntax theme</Label>
                                <Select value={config.theme} onValueChange={(value) => setConfig({ ...config, theme: value })}>
                                    <SelectTrigger className="col-span-2 w-full">
                                        <SelectValue placeholder="Select theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {themes.map((theme) => (
                                            <SelectItem key={theme.label} value={theme.value}>
                                                {theme.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Background settings */}
            </div>
        </footer>
    );
}
