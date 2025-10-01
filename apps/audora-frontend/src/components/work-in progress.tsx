interface WorkInProgressProps {
    title: string;
}

export default function WorkInProgress({ title }: WorkInProgressProps) {
    return (
        <div className="w-full fixed top-0 z-[60] bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/80 border-b border-zinc-800">
            <div className="mx-auto max-w-7xl px-4 py-2 text-center">
                <p className="text-xs sm:text-sm text-zinc-200">
                    {title}
                </p>
            </div>
        </div>
    );
}