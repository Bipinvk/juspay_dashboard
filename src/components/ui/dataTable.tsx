// DataTable.tsx
import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (item: any) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column[];
    itemsPerPage?: number;
    onViewDetails?: (item: T) => void;
    onEdit?: (item: T) => void;
    onRowClick?: (item: T) => void; // New prop for row click
}

function DataTable<T extends { id: string }>({
    data,
    columns,
    itemsPerPage = 4,
    onViewDetails,
    onEdit,
    onRowClick // Add to props destructuring
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    // Check if actions column should be rendered
    const hasActions = onViewDetails || onEdit;

    const sortedData = useMemo(() => {
        let sortableData = [...data];
        if (sortConfig) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const handleSort = (key: string) => {
        setSortConfig(prev =>
            prev?.key === key && prev.direction === 'asc'
                ? { key, direction: 'desc' }
                : { key, direction: 'asc' }
        );
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="space-y-6">
                <div className="overflow-x-auto rounded-b-lg ">
                    <table className="w-full border-collapse bg-white rounded-lg">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-50 to-gray-100">
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="px-6 py-3 text-left text-base font-semibold text-gray-800 border-b"
                                    >
                                        {column.sortable ? (
                                            <button
                                                onClick={() => handleSort(column.key)}
                                                className="flex items-center gap-1 hover:bg-blue-100 rounded px-2 py-1 transition"
                                            >
                                                <span>{column.label}</span>
                                                {sortConfig?.key === column.key && (
                                                    sortConfig.direction === 'asc'
                                                        ? <ChevronUp className="w-4 h-4 text-blue-600" />
                                                        : <ChevronDown className="w-4 h-4 text-blue-600" />
                                                )}
                                            </button>
                                        ) : (
                                            column.label
                                        )}
                                    </th>
                                ))}
                         
                            </tr>
                        </thead>
                        <tbody className='rounded-b-lg'>
                            {currentData.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + (hasActions ? 1 : 0)} className="px-6 py-10 text-center text-base text-gray-500">
                                        <span className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
                                            No data found.
                                        </span>
                                    </td>
                                </tr>
                            ) : (
                                currentData.map((item, idx) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => onRowClick && onRowClick(item)} // Add onClick handler
                                        className={`transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                                    >
                                        {columns.map((column) => (
                                            <td key={column.key} className="px-6 py-3 text-base text-gray-900 border-b">
                                                {column.render ? column.render(item) : item[column.key]}
                                            </td>
                                        ))}
                                   
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-end items-center gap-2 mt-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-blue-50 transition disabled:opacity-50 focus:outline-none"
                            aria-label="Previous page"
                        >
                            <ChevronLeft />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`p-2 px-4 border rounded-lg font-semibold transition focus:outline-none ${currentPage === page
                                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                                    : 'border-gray-300 bg-white hover:bg-blue-100 text-gray-700'
                                    }`}
                                aria-label={`Page ${page}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-gray-300 rounded-lg bg-white hover:bg-blue-50 transition disabled:opacity-50 focus:outline-none"
                            aria-label="Next page"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default DataTable;