"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import CodePreview from "@/components/CodePreview";

export default function Home() {
  const [config, setConfig] = useState({
    language: "javascript",
    theme: "vs-dark",
    padding: 20,
    windowWidth: 400,
    backgroundPadding: 40,
    backgroundColor: "#1e293b",
    backgroundImage: null as string | null,
    fileName: "example.js",
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`
  });

  const [showDragControls, setShowDragControls] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        config={config} 
        setConfig={setConfig}
        showDragControls={showDragControls}
        setShowDragControls={setShowDragControls}
      />
      <CodePreview 
        config={config} 
        setConfig={setConfig}
        showDragControls={showDragControls}
      />
    </div>
  );
}
