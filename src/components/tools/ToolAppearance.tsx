"use client";

import ColorPicker from "@/components/ColorPicker";
import ThemePreview from "@/components/ThemePreview";
import { Input } from "@/components/ui/input";
import { SelectItemRaw } from "@/components/ui/select";
import { BackgroundType, ScreenshotConfig } from "@/types/screenshot";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeWindowTheme } from "@/types/theme";
import { useEffect } from "react";
import ImageUpload from "@/components/ImageUpload";

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    config: ScreenshotConfig;
    setConfig: (config: ScreenshotConfig) => void;
    themes: CodeWindowTheme[];
}

export function ToolAppearance({ config, setConfig, themes, ...props }: ToolbarProps) {
    // Handle background settings for transparent/transparent adjacent concerns
    useEffect(() => {
        if (config.backgroundType === "transparent") {
            setConfig({ ...config, backgroundImage: null, backgroundColor: "transparent" });
        } else if (config.backgroundType === "color" && config.backgroundColor === "transparent") {
            setConfig({ ...config, backgroundColor: "#7e7e7e" });
        }
    }, [config.backgroundType]);

    // Image upload
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

    return (
        <div {...props}>
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
                    <SelectTrigger id="theme" className="w-full p-1 pr-2 col-span-2 min-h-fit">
                        <ThemePreview theme={config.theme} isSelected={true} />
                    </SelectTrigger>
                    <SelectContent className="gap-2">
                        {themes.map((theme) => (
                            <SelectItemRaw key={theme.name} value={theme.id} className="p-2">
                                <ThemePreview theme={theme} isSelected={theme.id === config.theme.id} />
                            </SelectItemRaw>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {/* Background */}
            <Tabs value={config.backgroundType} onValueChange={(value) => setConfig({ ...config, backgroundType: value as BackgroundType })}>
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
                <TabsContent value="image">
                    <div className="grid mt-2 grid-cols-2 items-center gap-4">
                        <Label htmlFor="bgImage">Upload image</Label>
                        <div className="flex justify-end gap-1">
                            {/* <Input id="bgImage" placeholder="" type="file" accept="image/*" onChange={handleImageUpload} className="w-full" /> */}
                            <ImageUpload className="w-full" image={config.backgroundImage} onImageChange={(image) => setConfig({ ...config, backgroundImage: image })} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
