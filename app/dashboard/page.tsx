"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// shadcn components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

// react-icons
import { FiEdit, FiTrash2, FiVolume2 } from "react-icons/fi";
import { FaPlay, FaPause } from "react-icons/fa";
import {
    RxDoubleArrowLeft,
    RxArrowLeft,
    RxArrowRight,
    RxDoubleArrowRight,
} from "react-icons/rx";

interface Track {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    audioUrl: string;
    author: string;
    genres: string;
}

function AudioPlayer({
    src,
    globalVolume,
}: {
    src: string;
    globalVolume: number;
}) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = globalVolume;

        const updateProgress = () => setProgress(audio.currentTime);
        audio.addEventListener("timeupdate", updateProgress);

        return () => audio.removeEventListener("timeupdate", updateProgress);
    }, [globalVolume]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) audio.pause();
        else audio.play();
        setPlaying(!playing);
    };

    const handleSliderChange = (value: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = value;
        setProgress(value);
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={togglePlay}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white"
            >
                {playing ? <FaPause /> : <FaPlay />}
            </button>
            <input
                type="range"
                min={0}
                max={audioRef.current?.duration || 100}
                value={progress}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="flex-1 h-1 rounded-lg accent-red-500"
            />
            <audio ref={audioRef} src={src} className="hidden" />
        </div>
    );
}

export default function DashboardPage() {
    const router = useRouter();
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [globalVolume, setGlobalVolume] = useState(1);

    const pageCount = Math.ceil(tracks.length / rowsPerPage);
    const paginatedTracks = tracks.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) router.replace("/login");
            else setUser(user);
        };
        checkUser();
    }, [router, supabase]);

    useEffect(() => {
        const fetchTracks = async () => {
            const { data, error } = await supabase
                .from("tracks")
                .select("id, title, description, artwork_url, audio_url, author");
            if (error) return console.error(error);

            setTracks(
                data?.map((t: any) => ({
                    id: t.id,
                    title: t.title,
                    description: t.description,
                    coverUrl: t.artwork_url,
                    audioUrl: t.audio_url,
                    author: t.author,
                    genres: "",
                })) || []
            );
        };
        fetchTracks();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace("/login");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                <nav className="flex flex-col gap-2">
                    <Button variant="ghost" className="justify-start">Gestisci Tracce</Button>
                </nav>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="flex items-center justify-between h-16 px-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <FiVolume2 />
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={globalVolume}
                                onChange={(e) => setGlobalVolume(Number(e.target.value))}
                                className="h-1 rounded-lg accent-red-500"
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-lg shadow-lg bg-neutral-800 text-white">
                                <div className="px-4 py-2 text-xs border-b border-neutral-700">
                                    Accesso come <br />
                                    <span className="font-medium">{user.email}</span>
                                </div>
                                <DropdownMenuItem onClick={() => router.push("/")}>Vai al sito</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto space-y-6">
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
                                                        <Button size="sm" variant="ghost" className="p-1">⋮</Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-36 rounded-lg shadow-lg bg-neutral-800 text-white">
                                                        <DropdownMenuItem className="flex items-center gap-2 hover:bg-neutral-700">
                                                            <FiEdit className="w-4 h-4" /> Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="flex items-center gap-2 hover:bg-red-600 hover:text-white">
                                                            <FiTrash2 className="w-4 h-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>


                            </Table>

                            {/*Footer*/}
                            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                                {/* Sinistra: totale tracce */}
                                <div className="flex items-center gap-2">
                                    <span>{tracks.length} tracce</span>
                                </div>

                                {/* Destra: righe per pagina + pagina corrente + pulsanti */}
                                <div className="flex items-center">
                                    {/* Selettore righe per pagina */}
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

                                    {/* Gap di 10 tra select e counter */}
                                    <div className="ml-10">
                                        <span>{`Pagina ${currentPage} di ${pageCount}`}</span>
                                    </div>

                                    {/* Gap di 10 tra counter e pulsanti */}
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
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        >
                                            <RxArrowLeft />
                                        </button>

                                        <button
                                            className="bg-neutral-800 text-white px-2 py-1 rounded hover:bg-neutral-700 disabled:bg-neutral-800 disabled:opacity-50"
                                            disabled={currentPage === pageCount}
                                            onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
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
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
