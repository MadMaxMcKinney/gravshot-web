import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "@/lib/languages";
import { themeList } from "@/lib/themes";
import { ScreenshotConfig } from "@/types/screenshot";
import { Switch } from "@/components/ui/switch";
import { Code, Cog, Eye, Image, Share } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "@/components/ColorPicker";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ThemePreview from "@/components/ThemePreview";

interface ToolbarProps {
    config: ScreenshotConfig;
    setConfig: (config: ScreenshotConfig) => void;
}

export default function Toolbar({ config, setConfig }: ToolbarProps) {
    const themes = themeList;

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
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="leading-none font-medium">Appearance</h4>
                                    <p className="text-muted-foreground text-sm">Customize the background, colors, and more.</p>
                                </div>
                                {/* Theme */}
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="theme">Theme</Label>
                                    <Select
                                        value={config.theme.id}
                                        onValueChange={(themeId) => {
                                            const selectedTheme = themes.find((theme) => theme.id === themeId);
                                            if (selectedTheme) {
                                                setConfig({ ...config, theme: selectedTheme });
                                            }
                                        }}
                                    >
                                        <SelectTrigger id="theme" className="w-full col-span-2 min-h-fit">
                                            <ThemePreview theme={config.theme} isSelected={true} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {themes.map((theme) => (
                                                <SelectItem key={theme.name} value={theme.id} className="p-2">
                                                    <ThemePreview theme={theme} isSelected={theme.id === config.theme.id} />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Background */}
                                <Tabs defaultValue="color">
                                    <div className="flex justify-between">
                                        <Label htmlFor="backgroundTypes">Background</Label>
                                        <TabsList id="backgroundTypes">
                                            <TabsTrigger value="color">Color</TabsTrigger>
                                            <TabsTrigger value="image">Image</TabsTrigger>
                                            <TabsTrigger value="transparent">Transparent</TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent value="color">
                                        <div className="grid mt-2 grid-cols-2 items-center gap-4">
                                            <Label htmlFor="bgColor">Background color</Label>
                                            <div className="flex justify-end gap-1">
                                                <ColorPicker className="flex-1" color={config.backgroundColor} setConfig={setConfig} config={config} />
                                                <Input id="bgColor" value={config.backgroundColor} onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })} className="w-28" />
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="image">Change your password here.</TabsContent>
                                </Tabs>
                            </div>
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
                <Button>
                    Export image <Share />
                </Button>
            </div>
        </footer>
    );
}
