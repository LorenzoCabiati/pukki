"use client";

import { FiVolume2 } from "react-icons/fi";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
    user: any;
    globalVolume: number;
    setGlobalVolume: (n: number) => void;
    onLogout: () => void;
}

export default function Topbar({ user, globalVolume, setGlobalVolume, onLogout }: TopbarProps) {
    return (
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
                    <DropdownMenuContent
                        align="end"
                        className="w-56 rounded-lg shadow-lg bg-neutral-800 text-white"
                    >
                        <div className="px-4 py-2 text-xs border-b border-neutral-700">
                            Accesso come <br />
                            <span className="font-medium">{user.email}</span>
                        </div>

                        <DropdownMenuItem
                            onClick={() => window.location.href = "/"}
                            className="cursor-pointer data-[highlighted]:bg-neutral-700 data-[highlighted]:text-white"
                        >
                            Vai al sito
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={onLogout}
                            className="cursor-pointer text-red-600 data-[highlighted]:bg-red-600/20 data-[highlighted]:text-red-500"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>

                </DropdownMenu>
            </div>
        </header>
    );
}
