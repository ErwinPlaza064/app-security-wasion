import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function GlobalLoading() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribeStart = router.on('start', () => setLoading(true));
        const unsubscribeFinish = router.on('finish', () => setLoading(false));

        return () => {
            unsubscribeStart();
            unsubscribeFinish();
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/20 backdrop-blur-sm transition-all duration-500">
            {/* Background elements for depth */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="relative flex flex-col items-center">
                {/* The "Core" - Modern Spinner Concept */}
                <div className="relative w-24 h-24 mb-10">
                    {/* Ring 1: Static subtle base */}
                    <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
                    
                    {/* Ring 2: Primary orbit */}
                    <div className="absolute inset-0 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_2s_cubic-bezier(0.4,0,0.2,1)_infinite]"></div>
                    
                    {/* Ring 3: Fast inner pulse orbit */}
                    <div className="absolute inset-3 border border-r-primary border-t-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1s_linear_infinite_reverse] opacity-40"></div>
                    
                    {/* Center: Pulsing Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_20px_2px_rgba(var(--primary-rgb),0.8)] animate-pulse"></div>
                    </div>

                    {/* Scanning Line Effect */}
                    <div className="absolute inset-[-20px] bg-gradient-to-b from-transparent via-primary/10 to-transparent h-px w-[140%] -left-[20%] animate-[bounce_3s_ease-in-out_infinite] opacity-30"></div>
                </div>

                {/* Text Labels */}
                <div className="text-center space-y-3">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="h-px w-6 bg-gradient-to-r from-transparent to-primary/20"></div>
                        <span className="text-[11px] font-black text-gray-900 uppercase tracking-[0.6em]">
                            Procesando
                        </span>
                        <div className="h-px w-6 bg-gradient-to-l from-transparent to-primary/20"></div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] animate-pulse">
                            Sincronizando con el servidor
                        </span>
                        
                        {/* Status bar (bottom tiny) */}
                        <div className="mt-4 w-32 h-[1px] bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary/40 animate-[loading-bar_1.5s_ease-in-out_infinite]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
}
