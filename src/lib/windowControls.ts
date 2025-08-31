import { createWindowControlsTheme } from "@/lib/windowControlsFactory";

export const macosWindowControls = createWindowControlsTheme({
    id: "macos",
    name: "macOS",
    gap: "8px",
    colors: ["#FA2C37", "#EFB100", "#00C950"],
    borderRadii: "8px",
});

export const whiteWindowControls = createWindowControlsTheme({
    id: "white",
    name: "White",
    gap: "8px",
    colors: ["#ffffff", "#ffffff", "#ffffff"],
    borderRadii: "8px",
});

export const blackWindowControls = createWindowControlsTheme({
    id: "black",
    name: "Black",
    gap: "8px",
    colors: ["#000000", "#000000", "#000000"],
    borderRadii: "8px",
});

export const windowControlsList = [macosWindowControls, whiteWindowControls, blackWindowControls];
