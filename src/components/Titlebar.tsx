import { Orbit } from "lucide-react";

export default function Titlebar() {
    return (
        <header className="fixed top-12 left-0 right-0 items-start px-12 flex flex-col gap-2 justify-start">
            <div className="rounded-xl shadow-md/5 pl-2 pr-3 py-1 bg-background/80 border border-border flex gap-4">
                <div className="flex items-center gap-1 text font-medium">
                    {/* Logo */}
                    <span className="w-5">
                        <svg width="100%" height="auto" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2_2)">
                                <circle cx="28" cy="28" r="28" fill="black" />
                                <path
                                    d="M40.5115 19.726C42.1297 22.172 42.9954 25.0387 43.0015 27.9715C43.0075 30.9043 42.1537 33.7746 40.5456 36.2272C38.9375 38.6799 36.6456 40.6073 33.9536 41.7711C31.2615 42.9348 28.2873 43.2839 25.399 42.775"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15.4885 36.274C13.8703 33.8274 13.0049 30.96 12.9996 28.0266C12.9942 25.0933 13.849 22.2227 15.4582 19.7702C17.0674 17.3176 19.3604 15.3908 22.0535 14.228C24.7465 13.0652 27.7214 12.7175 30.61 13.228"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M28 32.5C30.4853 32.5 32.5 30.4853 32.5 28C32.5 25.5147 30.4853 23.5 28 23.5C25.5147 23.5 23.5 25.5147 23.5 28C23.5 30.4853 25.5147 32.5 28 32.5Z"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M38.5 20.5C40.1569 20.5 41.5 19.1569 41.5 17.5C41.5 15.8431 40.1569 14.5 38.5 14.5C36.8431 14.5 35.5 15.8431 35.5 17.5C35.5 19.1569 36.8431 20.5 38.5 20.5Z"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M17.5 41.5C19.1569 41.5 20.5 40.1569 20.5 38.5C20.5 36.8431 19.1569 35.5 17.5 35.5C15.8431 35.5 14.5 36.8431 14.5 38.5C14.5 40.1569 15.8431 41.5 17.5 41.5Z"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_2_2">
                                    <rect width="56" height="56" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                    <h1 className="font-[Oxanium]">gravshot</h1>
                </div>
            </div>
        </header>
    );
}
