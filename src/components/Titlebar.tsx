import { Orbit } from "lucide-react";

export default function Titlebar() {
    return (
        <header className="fixed top-12 left-0 right-0 items-start px-12 flex flex-col gap-2 justify-start">
            <div className="rounded-xl shadow-md/5 px-3 py-1 bg-background/80 border border-border flex gap-4">
                <div className="flex items-center gap-1 text-lg font-medium">
                    <Orbit width={16} strokeWidth={2} />
                    <h1 className="font-[Oxanium]">gravshot</h1>
                </div>
            </div>
            {/* <a href="https://maxmckinney.com" className="text-sm text-muted-foreground font-medium">
                created by @maxmckinney
            </a> */}
        </header>
    );
}
