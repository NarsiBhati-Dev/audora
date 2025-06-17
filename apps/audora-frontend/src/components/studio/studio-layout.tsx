
export default function StudioLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className='mx-auto mt-16 h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center gap-10 px-4 md:flex md:flex-col md:gap-12 lg:flex-row'>
            {children}
        </div>
    );
}