import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ImageUploadProps {
    image: string | null;
    onImageChange: (image: string | null) => void;
    className?: string;
}

export default function ImageUpload({ image, onImageChange, className = "" }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onImageChange(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleRemoveImage = () => {
    //     onImageChange(null);
    //     if (fileInputRef.current) {
    //         fileInputRef.current.value = "";
    //     }
    // };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Hidden file input */}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            {/* Image preview or upload button */}
            {image ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className="w-full h-12 rounded-md border border-border overflow-hidden bg-cover bg-center bg-no-repeat shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ backgroundImage: `url(${image})` }}
                            onClick={handleUploadClick}
                        />
                    </TooltipTrigger>
                    <TooltipContent>Click to change image</TooltipContent>
                </Tooltip>
            ) : (
                <Button variant="outline" size="icon" onClick={handleUploadClick} className="w-full h-12" title="Upload image">
                    <Upload className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
}
