import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white font-sans selection:bg-purple-500 selection:text-white">
            {/* Abstract Background Shapes */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
                <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                            Contact<span className="text-white">Deck</span>
                        </h1>
                        <p className="mt-2 text-indigo-200/60 text-sm font-medium uppercase tracking-wider">
                            Your Professional Network
                        </p>
                    </div>
                    {/* Header actions can be injected here if needed, or children can handle it */}
                </header>

                <main className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 min-h-[600px] transition-all duration-300">
                    {children}
                </main>

                <footer className="mt-8 text-center text-indigo-300/40 text-xs">
                    © {new Date().getFullYear()} ContactDeck. Built with React & Tailwind.
                </footer>
            </div>
        </div>
    );
};
