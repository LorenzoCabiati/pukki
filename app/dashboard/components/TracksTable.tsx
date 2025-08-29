"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import AudioPlayer from "./AudioPlayer";
import PaginationFooter from "./PaginationFooter";

interface Track {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    audioUrl: string;
    author: string;
    genres: string;
}

interface TracksTableProps {
    tracks: Track[];
    globalVolume: number;
    currentPage: number;
    pageCount: number;
    rowsPerPage: number;
    setRowsPerPage: (n: number) => void;
    setCurrentPage: (n: number) => void;
}

export default function TracksTable({
    tracks,
    globalVolume,
    currentPage,
    pageCount,
    rowsPerPage,
    setRowsPerPage,
    setCurrentPage,
}: TracksTableProps) {
    const paginatedTracks = tracks.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <CardTitle>Gestione Tracce</CardTitle>
                <div className="flex gap-2 mt-2 md:mt-0">
                    <Button size="sm" variant="secondary">Nuova traccia</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table className="border border-gray-200 dark:border-neutral-700 rounded-lg overflow-hidden">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Titolo</TableHead>
                            <TableHead>Descrizione</TableHead>
                            <TableHead>Copertina</TableHead>
                            <TableHead>Audio</TableHead>
                            <TableHead>Autore</TableHead>
                            <TableHead>Generi</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedTracks.map(track => (
                            <TableRow key={track.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors py-2">
                                <TableCell className="truncate py-2">{track.title}</TableCell>
                                <TableCell className="truncate py-2">{track.description}</TableCell>
                                <TableCell className="py-2">
                                    {track.coverUrl && (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <img src={track.coverUrl} alt={track.title} className="w-10 h-10 object-cover cursor-pointer rounded-md" />
                                            </DialogTrigger>
                                            <DialogContent className="max-w-lg p-4">
                                                <DialogTitle className="sr-only">Anteprima copertina: {track.title}</DialogTitle>
                                                <img src={track.coverUrl} alt={track.title} className="w-full h-auto object-contain rounded-md" />
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </TableCell>
                                <TableCell className="py-2">
                                    <AudioPlayer src={track.audioUrl} globalVolume={globalVolume} />
                                </TableCell>
                                <TableCell className="py-2">{track.author}</TableCell>
                                <TableCell className="py-2">{track.genres}</TableCell>
                                <TableCell className="py-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="sm" variant="ghost" className="p-1"><BsThreeDots /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-36 rounded-lg shadow-lg bg-neutral-800 text-white">
                                            <DropdownMenuItem
                                                className="flex items-center gap-2 px-3 py-2 cursor-pointer 
               data-[highlighted]:bg-neutral-700/50 data-[highlighted]:text-white"
                                            >
                                                <FiEdit className="w-4 h-4" /> Edit
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                className="flex items-center gap-2 px-3 py-2 cursor-pointer text-red-600
             data-[highlighted]:bg-red-600/20 data-[highlighted]:text-red-500"
                                            >
                                                <FiTrash2 className="w-4 h-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>



                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <PaginationFooter
                    currentPage={currentPage}
                    pageCount={pageCount}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={tracks.length}
                />
            </CardContent>
        </Card>
    );
}
