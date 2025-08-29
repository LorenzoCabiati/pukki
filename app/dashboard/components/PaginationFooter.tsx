"use client";

import { RxDoubleArrowLeft, RxArrowLeft, RxArrowRight, RxDoubleArrowRight } from "react-icons/rx";

interface PaginationFooterProps {
    currentPage: number;
    pageCount: number;
    rowsPerPage: number;
    setRowsPerPage: (n: number) => void;
    setCurrentPage: (n: number) => void;
    totalItems: number;
}

export default function PaginationFooter({
    currentPage,
    pageCount,
    rowsPerPage,
    setRowsPerPage,
    setCurrentPage,
    totalItems,
}: PaginationFooterProps) {
    return (
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
            {/* Totale tracce */}
            <div className="flex items-center gap-2">
                <span>{totalItems} tracce</span>
            </div>

            {/* Righe per pagina + pagine + pulsanti */}
            <div className="flex items-center">
                <div className="flex items-center gap-2">
                    <span>Tracce per pagina:</span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="bg-neutral-700 text-white border border-neutral-600 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                        {[10, 25, 50, 100].map((n) => (
                            <option key={n} value={n} className="bg-neutral-700 text-white">
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="ml-10">
                    <span>{`Pagina ${currentPage} di ${pageCount}`}</span>
                </div>

                <div className="flex items-center gap-2 ml-10">
                    <button
                        className="bg-neutral-800 text-white px-2 py-1 rounded hover:bg-neutral-700 disabled:bg-neutral-800 disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        <RxDoubleArrowLeft />
                    </button>

                    <button
                        className="bg-neutral-800 text-white px-2 py-1 rounded hover:bg-neutral-700 disabled:bg-neutral-800 disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    >
                        <RxArrowLeft />
                    </button>

                    <button
                        className="bg-neutral-800 text-white px-2 py-1 rounded hover:bg-neutral-700 disabled:bg-neutral-800 disabled:opacity-50"
                        disabled={currentPage === pageCount}
                        onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
                    >
                        <RxArrowRight />
                    </button>

                    <button
                        className="bg-neutral-800 text-white px-2 py-1 rounded hover:bg-neutral-700 disabled:bg-neutral-800 disabled:opacity-50"
                        disabled={currentPage === pageCount}
                        onClick={() => setCurrentPage(pageCount)}
                    >
                        <RxDoubleArrowRight />
                    </button>

                </div>
            </div>
        </div>
    );
}
