import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import React from "react";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";

export type DropdownItem = {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void | Promise<void>; // Support both sync and async onClick
    variant?: "default" | "danger" | "warning";
    disabled?: boolean; // Add disabled property
    className?: string; // Add className property
};

type DropdownMenuProps = {
    items: DropdownItem[]; // Use 'items' to match the prop name
    buttonClassName?: string;
};

export default function DropdownMenu({ items, buttonClassName }: DropdownMenuProps) {
    const { refs, floatingStyles } = useFloating({
        placement: "bottom-start", // Position below and aligned to the start
        middleware: [offset(8), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    return (
        <Menu as="div" className="relative inline-block text-left">
            {/* Trigger Button */}
            <MenuButton
                ref={refs.setReference}
                className={`p-2 rounded-full hover:bg-gray-100 transition ${buttonClassName}`}
                disabled={items.every(item => item.disabled)} // Disable button if all items are disabled
            >
                <MoreVertical className="w-5 h-5 text-gray-600" />
            </MenuButton>

            {/* Dropdown Items with Transition */}
            <Transition
                as={React.Fragment}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <MenuItems
                    portal
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className="bg-white border border-gray-200 rounded-lg shadow-md focus:outline-none z-[9999] w-40"
                >
                    <div className="py-1">
                        {items.map((item, index) => (
                            <MenuItem key={index} disabled={item.disabled}>
                                {({ active, disabled }) => (
                                    <button
                                        onClick={async () => {
                                            await item.onClick(); // Handle both sync and async onClick
                                        }}
                                        disabled={disabled}
                                        className={cn(
                                            "flex items-center gap-2 w-full px-4 py-2 text-left text-sm",
                                            item.variant === "danger"
                                                ? "text-red-600"
                                                : item.variant === "warning"
                                                    ? "text-yellow-600"
                                                    : "text-blue-700",
                                            active && !disabled
                                                ? item.variant === "danger"
                                                    ? "bg-red-50"
                                                    : item.variant === "warning"
                                                        ? "bg-yellow-50"
                                                        : "bg-blue-100"
                                                : "",
                                            disabled ? "opacity-50 cursor-not-allowed" : "",
                                            item.className // Apply custom className
                                        )}
                                    >
                                        {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                                        {item.label}
                                    </button>
                                )}
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
}

// Utility function for className merging (copied from your SearchableSelect)
const cn = (...classes: (string | undefined | null | false)[]): string =>
    classes.filter(Boolean).join(" ");