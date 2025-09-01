import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "@/lib/languages";
import { themeList } from "@/lib/themes";
import { ScreenshotConfig } from "@/types/screenshot";
import { Switch } from "@/components/ui/switch";
import { Code, Cog, Image, Share } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ToolAppearance } from "@/components/tools/ToolAppearance";

interface ToolbarProps {
    config: ScreenshotConfig;
    setConfig: (config: ScreenshotConfig) => void;
    onExport?: () => void;
}

export default function Toolbar({ config, setConfig, onExport }: ToolbarProps) {
    const themes = themeList;

    return (
        <footer className="fixed bottom-12 left-0 right-0 flex flex-col justify-center items-center gap-3 px-12">
            <div className="rounded-xl shadow-lg px-3 py-3 bg-background/80 border border-border flex gap-4">
                <Input type="text" placeholder="file_name.js" onChange={(e) => setConfig({ ...config, fileName: e.target.value })} className="max-w-40" />
                <div className="flex gap-2">
                    {/* Code settings */}
                    <Popover>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PopoverTrigger asChild>
                                    <Button size="icon" variant="outline">
                                        <Code />
                                    </Button>
                                </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Code</TooltipContent>
                        </Tooltip>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="leading-none font-medium">Code settings</h4>
                                    <p className="text-muted-foreground text-sm">Adjust code settings used in the preview.</p>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="language">Language</Label>
                                    <Select value={config.language} onValueChange={(value) => setConfig({ ...config, language: value })}>
                                        <SelectTrigger className="col-span-2 w-full">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent id="language">
                                            {languages.map((language) => (
                                                <SelectItem key={language.label} value={language.value}>
                                                    {language.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    {/* Appearance settings */}
                    <Popover>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PopoverTrigger asChild>
                                    <Button size="icon" variant="outline">
                                        <Image />
                                    </Button>
                                </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Appearance</TooltipContent>
                        </Tooltip>
                        <PopoverContent className="w-100">
                            <ToolAppearance config={config} setConfig={setConfig} themes={themes} className="grid gap-4" />
                        </PopoverContent>
                    </Popover>
                    {/* Editor settings */}
                    <Popover>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <PopoverTrigger asChild>
                                    <Button size="icon" variant="outline">
                                        <Cog />
                                    </Button>
                                </PopoverTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Editor</TooltipContent>
                        </Tooltip>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="leading-none font-medium">Editor settings</h4>
                                    <p className="text-muted-foreground text-sm">Configure your editor experience.</p>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="showDragHandles" className="col-span-2">
                                        Show drag handles
                                    </Label>
                                    <div className="col-span-1 flex justify-end">
                                        <Switch id="showDragHandles" checked={config.showDragControls} onCheckedChange={(checked) => setConfig({ ...config, showDragControls: checked })} />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <Button onClick={() => onExport && onExport()}>
                    Export image <Share />
                </Button>
            </div>
        </footer>
    );
}
