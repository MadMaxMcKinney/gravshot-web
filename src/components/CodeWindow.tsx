interface CodeWindowProps {
    fileName: string;
    children: React.ReactNode;
    windowWidth: number;
}

export default function CodeWindow({ fileName, children, windowWidth }: CodeWindowProps) {
    return (
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden" style={{ width: windowWidth }}>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-700 border-b border-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="text-sm text-gray-300 font-medium">{fileName}</div>

                <div className="w-16"></div>
            </div>

            <div>{children}</div>
        </div>
    );
}
