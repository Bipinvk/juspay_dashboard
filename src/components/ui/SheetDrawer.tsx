import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

interface Step {
    title: string;
    description: string;
}

interface SheetProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    header: string;
    side?: "top" | "right" | "bottom" | "left";
    stepper?: boolean;
    activeStep?: number;
    steps?: Step[];
    className?: string;
}

const Sheet = ({
    open,
    onClose,
    children,
    side = "right",
    header,
    stepper,
    className
}: SheetProps) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40",
                    open ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={!stepper ? onClose : undefined}
            />

            {/* Drawer Panel */}
            <div
                className={cn(
                    "fixed z-50 bg-white shadow-xl transition-transform duration-300 text-gray-900",
                    side === "right" && [
                        "right-0 top-0 h-full w-3/4 md:w-1/3 rounded-l-xl",
                        open ? "translate-x-0" : "translate-x-full"
                    ],
                    side === "left" && [
                        "left-0 top-0 h-full w-3/4 md:w-1/3 rounded-r-xl",
                        open ? "translate-x-0" : "-translate-x-full"
                    ],
                    side === "top" && [
                        "top-0 left-0 w-full h-1/3 rounded-b-xl",
                        open ? "translate-y-0" : "-translate-y-full"
                    ],
                    side === "bottom" && [
                        "bottom-0 left-0 w-full h-1/3 rounded-t-xl",
                        open ? "translate-y-0" : "translate-y-full"
                    ],
                    className
                )}
            >
                {/* Stepper Header */}
                {stepper && (
                    <div className={cn(
                        "w-full p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50",
                        side === "right" && "rounded-tl-xl",
                        side === "left" && "rounded-tr-xl",
                        side === "top" && "rounded-t-xl",
                        side === "bottom" && "rounded-t-xl"
                    )}>
                        <div className="flex items-center gap-3 overflow-x-auto">
                            {/* Add step display here if needed */}
                            <span className="text-sm font-medium">{header}</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 text-gray-500 hover:text-red-500 transition-colors p-1 rounded hover:bg-gray-200"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* Static Header */}
                {!stepper && (
                    <div className={cn(
                        "flex items-center justify-between border-b p-4 bg-gray-50 border-gray-200",
                        side === "right" && "rounded-tl-xl",
                        side === "left" && "rounded-tr-xl",
                        side === "top" && "rounded-t-xl",
                        side === "bottom" && "rounded-t-xl"
                    )}>
                        <h2 className="text-lg font-semibold text-gray-900">{header}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Sheet;