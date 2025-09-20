
import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"; // Your existing dialog component
import { Button } from "../button";

interface ReusableDialogProps {
    title: string;
    description?: string | React.ReactNode;
    children: React.ReactNode;
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClose?: () => void;
    onSave?: () => void;
    closeLabel?: string;
    saveLabel?: string;
    showFooter?: boolean;
    showHeader?: boolean;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    scrollable?: boolean;
    loading?: boolean;
    disabled?: boolean;
    variant?: "default" | "destructive" | "success";
    className?: string;
}

const ReusableDialog: React.FC<ReusableDialogProps> = ({
    title,
    description,
    children,
    trigger,
    open,
    onOpenChange,
    onClose,
    onSave,
    closeLabel = "Cancel",
    saveLabel = "Save",
    showFooter = true,
    showHeader = true,
    maxWidth = "lg",
    scrollable = true,
    loading = false,
    disabled = false,
    variant = "default",
    className,
}) => {
    const maxWidthClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full mx-4",
    };

    const getButtonVariant = () => {
        switch (variant) {
            case "destructive":
                return "destructive";
            case "success":
                return "default";
            default:
                return "default";
        }
    };

    const handleClose = () => {
        onClose?.();
        onOpenChange?.(false);
    };

    const handleSave = () => {
        if (!loading && !disabled) {
            onSave?.();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent
                className={`${maxWidthClasses[maxWidth]} ${className || ""} p-6`}
            >
                {showHeader && (
                    <DialogHeader className="pb-2">
                        <DialogTitle className="text-xl font-semibold text-textColor">
                            {title}
                        </DialogTitle>
                        {description && (
                            <DialogDescription className="text-sm text-gray-600 ">
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                )}

                <div
                    className={`flex-1 ${scrollable
                        ? "overflow-y-auto max-h-[60vh]"
                        : "overflow-hidden"
                        } py-4`}
                >
                    {children}
                </div>

                {showFooter && (
                    <DialogFooter className="pt-4 flex flex-row justify-end space-x-2">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                            className="min-w-20"
                        >
                            {closeLabel}
                        </Button>
                        {onSave && (
                            <Button
                                variant={getButtonVariant()}
                                onClick={handleSave}
                                disabled={disabled || loading}
                                className="min-w-20 bg-buttonBg text-white"
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Saving...</span>
                                    </div>
                                ) : (
                                    saveLabel
                                )}
                            </Button>
                        )}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ReusableDialog;