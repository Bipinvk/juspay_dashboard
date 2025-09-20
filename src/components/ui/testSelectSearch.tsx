import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Check, Loader2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';
import { debounce } from 'lodash';

const cn = (...classes: (string | undefined | null | false)[]): string =>
    classes.filter(Boolean).join(' ');

interface Option {
    value: string;
    label: string;
}

interface TestSearchableSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    'aria-label'?: string;
    icon?: React.ReactNode;
    mainclass?: string;
    onSearchChange?: (search: string) => void;
    hasMore?: boolean;
    isLoading?: boolean;
    onDropdownOpen?: () => void;
    selectedDetails?: Option | null;
    totalCount?: number;
    debounceDelay?: number;
    noOptionsMessage?: string;
    currentPage?: number;
    perPage?: number;
    onPrevious?: () => void;
    onNext?: () => void;
}

const TestSearchableSelect: React.FC<TestSearchableSelectProps> = ({
    options = [],
    value,
    onChange,
    placeholder = '',
    searchPlaceholder = 'Search...',
    className,
    disabled = false,
    required = false,
    'aria-label': ariaLabel,
    icon,
    mainclass,
    onSearchChange,
    hasMore = false,
    isLoading = false,
    onDropdownOpen,
    selectedDetails = null,
    totalCount = 0,
    debounceDelay = 300,
    noOptionsMessage = 'No options found',
    currentPage = 1,
    perPage = 20,
    onPrevious,
    onNext,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { refs, floatingStyles } = useFloating({
        placement: 'bottom-start',
        middleware: [offset(8), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    // Debounced search handler
    const debouncedSearch = useCallback(
        debounce((term: string) => {
            if (onSearchChange) {
                setIsSearching(true);
                onSearchChange(term);
            }
        }, debounceDelay),
        [onSearchChange, debounceDelay]
    );

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm('');
        debouncedSearch('');
    };

    // Sync selected option with value prop and selectedDetails
    useEffect(() => {
        if (selectedDetails && selectedDetails.value === value) {
            setSelectedOption(selectedDetails);
        } else {
            const option = options.find((opt) => opt.value === value);
            setSelectedOption(option || selectedDetails || null);
        }
    }, [value, options, selectedDetails]);

    // Handle dropdown open/close
    useEffect(() => {
        if (isOpen) {
            if (searchInputRef.current) {
                setTimeout(() => searchInputRef.current?.focus(), 100);
            }
            if (onSearchChange && searchTerm === '') {
                debouncedSearch('');
            }
            if (onDropdownOpen) {
                onDropdownOpen();
            }
        } else {
            clearSearch();
        }
    }, [isOpen, onSearchChange, onDropdownOpen, debouncedSearch]);

    // Reset searching state when new options are loaded
    useEffect(() => {
        if (isSearching && !isLoading) {
            setIsSearching(false);
        }
    }, [isLoading, isSearching]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'Enter' && !isOpen) {
            setIsOpen(true);
        }
    };

    const totalPages = Math.ceil(totalCount / perPage);
    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages || hasMore;

    return (
        <div className={cn('relative min-w-[400px] max-w-[600px]', className)} ref={selectRef}>
            {isLoading && !options.length ? (
                <div className="flex items-center p-2 text-gray-600 bg-white border border-gray-300 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading PBIs...
                </div>
            ) : icon ? (
                <button
                    type="button"
                    ref={refs.setReference}
                    className={cn(
                        'p-2 text-gray-400 hover:text-gray-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border rounded-lg',
                        isOpen ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'
                    )}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    aria-label={ariaLabel || 'Open filter options'}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    disabled={disabled}
                >
                    {icon}
                </button>
            ) : (
                <div className="relative">
                    <label
                        className={cn(
                            'absolute left-3 transition-all duration-200 ease-out pointer-events-none',
                            'text-gray-700 bg-white px-1',
                            selectedOption || isOpen
                                ? 'top-0 -translate-y-1/2 text-xs text-blue-600 z-10'
                                : 'top-1/2 -translate-y-1/2 text-sm'
                        )}
                    >
                        {placeholder}
                        {required && (selectedOption || isOpen) && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <button
                        type="button"
                        ref={refs.setReference}
                        className={cn(
                            'peer px-3 py-2 gap-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-gray-700 w-full text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed',
                            'focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none',
                            isOpen && 'ring-2 ring-blue-500 border-blue-500',
                            mainclass
                        )}
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        onKeyDown={handleKeyDown}
                        aria-label={ariaLabel || 'Select option'}
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                        disabled={disabled}
                    >
                        <span
                            className={cn(
                                'block truncate transition-opacity text-xl',
                                selectedOption ? 'opacity-100' : 'opacity-0'
                            )}
                        >
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                        <svg
                            className={cn(
                                'h-4 w-4 text-gray-400 transition-transform duration-200 flex-shrink-0',
                                isOpen && 'rotate-180'
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            )}

            {isOpen && (
                <div
                    ref={refs.setFloating}
                    style={{ ...floatingStyles, zIndex: 9999 }}
                    className={cn(
                        'bg-white border border-gray-200 rounded-lg shadow-2xl',
                        'ring-1 ring-gray-300 transition-opacity duration-200',
                        icon ? 'w-64' : 'w-full min-w-[400px] max-w-[600px] max-h-[400px] overflow-hidden'
                    )}
                >
                    {/* Search Header */}
                    <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-3 py-2">
                        <div className="flex items-center">
                            <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="flex-1 outline-none w-full text-sm placeholder:text-gray-400"
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            />
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="ml-2 text-gray-400 hover:text-gray-600"
                                    aria-label="Clear search"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Loading or Search State */}
                    {(isLoading || isSearching) ? (
                        <div className="py-4 px-3 text-sm text-gray-500 text-center">
                            <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                            {isSearching ? 'Searching...' : 'Loading PBIs...'}
                        </div>
                    ) : options.length === 0 ? (
                        <div className="py-2 px-3 text-sm text-gray-500 text-center">
                            {noOptionsMessage}
                        </div>
                    ) : (
                        <>
                            {/* Options List */}
                            <div className="overflow-auto max-h-[250px] scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                                {options.map((option) => {
                                    const isSelected = option.value === value;
                                    return (
                                        <button
                                            key={option.value}
                                            className={cn(
                                                'w-full text-left px-3 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors flex items-center justify-between',
                                                isSelected && 'bg-blue-50 text-blue-700'
                                            )}
                                            onClick={() => {
                                                onChange(option.value);
                                                setIsOpen(false);
                                            }}
                                            role="option"
                                            aria-selected={isSelected}
                                        >
                                            <span className="truncate">{option.label}</span>
                                            {isSelected && <Check className="h-4 w-4 ml-2 flex-shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="border-t border-gray-100 p-2 flex items-center justify-between text-sm text-gray-600 bg-gray-50">
                                    <div className="text-xs text-gray-500">
                                        Page {currentPage} of {totalPages}
                                        {totalCount > 0 && (
                                            <span className="ml-1">({totalCount} total)</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => onPrevious && onPrevious()}
                                            disabled={!canGoPrevious || isLoading}
                                            className={cn(
                                                'p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed',
                                                'flex items-center gap-1 text-xs'
                                            )}
                                            title="Previous page"
                                        >
                                            <ChevronLeft className="w-3 h-3" />
                                            Prev
                                        </button>
                                        <button
                                            onClick={() => onNext && onNext()}
                                            disabled={!canGoNext || isLoading}
                                            className={cn(
                                                'p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed',
                                                'flex items-center gap-1 text-xs'
                                            )}
                                            title="Next page"
                                        >
                                            Next
                                            <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestSearchableSelect;