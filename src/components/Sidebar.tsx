import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getThemeList } from "@/lib/themes";
import { ScreenshotConfig } from "@/types/screenshot";
import { Toggle } from "@/components/ui/toggle";

interface SidebarProps {
    config: ScreenshotConfig;
    setConfig: (config: ScreenshotConfig) => void;
}

const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "css", label: "CSS" },
    { value: "html", label: "HTML" },
    { value: "json", label: "JSON" },
];

export default function Sidebar({ config, setConfig }: SidebarProps) {
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
        <div className="w-[400px] bg-white border-r border-gray-200 p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Code Screenshot</h1>

            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                        <Label>Language</Label>
                        <Select value={config.language} onValueChange={(value) => setConfig({ ...config, language: value })}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map((lang) => (
                                    <SelectItem key={lang.value} value={lang.value}>
                                        {lang.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 flex-1">
                        <Label>Theme</Label>
                        <Select value={config.theme} onValueChange={(value) => setConfig({ ...config, theme: value })}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {themes.map((theme) => (
                                    <SelectItem key={theme.value} value={theme.value}>
                                        {theme.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fileName">File Name</Label>
                    <Input id="fileName" type="text" value={config.fileName} onChange={(e) => setConfig({ ...config, fileName: e.target.value })} placeholder="example.js" />
                </div>


                <div className="space-y-2">
                    <Label>Background Color</Label>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={config.backgroundColor}
                            onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                            className="w-12 h-10 rounded-xl border-none cursor-pointer"
                        />
                        <Input type="text" value={config.backgroundColor} onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })} className="flex-1 font-mono text-sm" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Background Image</Label>
                    <div className="space-y-3">
                        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-md cursor-pointer hover:border-ring transition-colors">
                            <div className="text-center">
                                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                <span className="mt-2 block text-sm text-muted-foreground">Click to upload image</span>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                        {config.backgroundImage && (
                            <div className="flex items-center justify-between p-2 bg-muted rounded">
                                <span className="text-sm text-muted-foreground">Image uploaded</span>
                                <Button variant="ghost" size="sm" onClick={clearBackgroundImage} className="text-destructive hover:text-destructive">
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Toggle id="showDragControls" onPressedChange={(checked) => setConfig({ ...config, showDragControls: checked })} className="border-gray-300">
                            Drag Controls
                        </Toggle>
                    </div>
                </div>
            </div>
        </div>
    );
}
