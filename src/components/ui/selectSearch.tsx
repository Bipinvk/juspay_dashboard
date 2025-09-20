import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Check, Loader2, X } from 'lucide-react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';
import { debounce } from 'lodash';
import { useVirtualizer } from '@tanstack/react-virtual';

const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
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
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  onDropdownOpen?: () => void;
  selectedDetails?: Option | null;
  totalCount?: number;
  debounceDelay?: number;
  noOptionsMessage?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
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
  onLoadMore,
  hasMore = false,
  isLoading = false,
  onDropdownOpen,
  selectedDetails = null,
  totalCount = 0,
  debounceDelay = 300,
  noOptionsMessage
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-end',
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  // Add virtualization
  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // Approximate row height
    overscan: 5,
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
    setIsSearching(true);
    debouncedSearch(term);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(true);
    debouncedSearch('');
  };

  // Sync selected option with value prop and selectedDetails
  useEffect(() => {
    const option = options.find(opt => opt.value === value) || selectedDetails || null;
    setSelectedOption(option);
  }, [value, options, selectedDetails]);

  // Reset loading states when new options are loaded or search completes
  useEffect(() => {
    if (isLoadingMore || isSearching) {
      setIsLoadingMore(false);
      setIsSearching(false);
    }
  }, [options]);

  // Handle dropdown open/close
  useEffect(() => {
    if (isOpen) {
      if (searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (onSearchChange && searchTerm === '') {
        setIsSearching(true);
        onSearchChange('');
      }
      if (onDropdownOpen) {
        onDropdownOpen();
      }
      if (parentRef.current) {
        parentRef.current.scrollTo({ top: 0 });
      }
    } else {
      clearSearch();
    }
  }, [isOpen, onSearchChange, onDropdownOpen]);

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

  // Handle load more button click
  const handleLoadMore = () => {
    if (onLoadMore && !isLoadingMore) {
      setIsLoadingMore(true);
      onLoadMore();
    }
  };

  return (
    <div className={cn('relative', className, !selectedOption && 'min-w-[200px]')} ref={selectRef}>
      {isLoading && !options.length ? (
        <div className="flex items-center p-2 text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Loading...
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
              'peer px-2 py-2 gap-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-gray-700 w-full text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed',
              'focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none',
              isOpen && 'ring-2 ring-blue-500 border-blue-500',
              mainclass ? 'py-4' : ''
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            aria-label={ariaLabel || 'Filter by status'}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            disabled={disabled}
          >
            <span
              className={cn(
                'block truncate transition-opacity',
                selectedOption ? 'opacity-100' : 'opacity-0'
              )}
            >
              {selectedOption ? selectedOption.label : ''}
            </span>
            <svg
              className={cn(
                'h-4 w-4 text-gray-400 transition-transform duration-200',
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
            ' bg-white border border-gray-200 rounded-lg shadow-2xl',
            'ring-1 ring-gray-300 transition-opacity duration-100',
            icon ? 'w-48' : 'w-full min-w-48 max-h-80 overflow-hidden'
          )}
        >
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
                  <X className='w-4 h-4' />
                </button>
              )}
            </div>
          </div>

          {(isLoading || isSearching) && !options.length ? (
            <div className="py-4 px-3 text-sm text-gray-500 text-center">
              <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
              {isSearching ? 'Searching...' : 'Loading options...'}
            </div>
          ) : options.length === 0 && !hasMore ? (
            <div className="py-2 px-3 text-sm text-gray-500 text-center">
              No options found
            </div>
          ) : (
            <>
              <div
                ref={parentRef}
                className="relative w-full overflow-auto max-h-[200px]"
                style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const option = options[virtualRow.index];
                  if (!option) return null;
                  const isSelected = option.value === value;
                  return (
                    <button
                      key={virtualRow.key}
                      data-index={virtualRow.index}
                      ref={rowVirtualizer.measureElement}
                      className={cn(
                        'absolute top-0 left-0 w-full text-left px-3 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors flex items-center justify-between option-item',
                        isSelected && 'bg-blue-50 text-blue-700'
                      )}
                      style={{
                        transform: `translateY(${virtualRow.start}px)`,
                        height: `${virtualRow.size}px`,
                      }}
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
              {hasMore && totalCount > options.length && (
                <div className="border-t border-gray-100 p-2">
                  {isLoadingMore ? (
                    <div className="w-full py-2 text-sm text-gray-500 text-center flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading more...
                    </div>
                  ) : (
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className={cn(
                        'w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center',
                        isLoadingMore && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      Load more ({options.length}/{totalCount})
                    </button>
                  )}
                </div>
              )}
             
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;