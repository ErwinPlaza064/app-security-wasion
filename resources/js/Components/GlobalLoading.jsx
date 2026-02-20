import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

export default function GlobalLoading() {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const unsubscribeStart = router.on('start', () => {
            setLoading(true);
            // Solo mostramos el loader si la petición tarda más de 250ms
            // Esto evita que "parpadee" en cambios de página instantáneos
            timerRef.current = setTimeout(() => {
                setVisible(true);
            }, 250);
        });

        const unsubscribeFinish = () => {
            setLoading(false);
            setVisible(false);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };

        const unsubscribeFinishEvent = router.on('finish', unsubscribeFinish);

        return () => {
            unsubscribeStart();
            unsubscribeFinishEvent();
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/20 backdrop-blur-[2px] transition-opacity duration-300">
            {/* Background elements for depth - GPU Optimizado */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] will-change-transform animate-pulse"></div>
            </div>

            <div className="relative flex flex-col items-center will-change-transform">
                {/* The "Core" - Optimized Spinner */}
                <div className="relative w-20 h-20 mb-8">
                    {/* Ring 1: Static subtle base */}
                    <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
                    
                    {/* Ring 2: Primary orbit - will-change for GPU acceleration */}
                    <div className="absolute inset-0 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite] will-change-transform"></div>
                    
                    {/* Ring 3: Fast inner pulse orbit */}
                    <div className="absolute inset-3 border border-r-primary/40 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_0.8s_linear_infinite_reverse] will-change-transform opacity-30"></div>
                    
                    {/* Center: Pulsing Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)] animate-pulse"></div>
                    </div>

                    {/* Scanning Line Effect - Usando transform para rendimiento */}
                    <div className="absolute inset-0 overflow-hidden rounded-full opacity-20">
                        <div className="w-full h-1 bg-gradient-to-b from-transparent via-primary to-transparent animate-[scan_2s_linear_infinite] will-change-transform"></div>
                    </div>
                </div>

                {/* Text Labels */}
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                        <span className="text-[10px] font-black text-gray-800 uppercase tracking-[0.4em]">
                            Cargando
                        </span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                            Un momento por favor
                        </span>
                        
                        {/* Status bar */}
                        <div className="mt-4 w-24 h-[1px] bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary/40 animate-[loading-bar_1.2s_ease-in-out_infinite] will-change-transform"></div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes scan {
                    0% { transform: translateY(-20px); }
                    100% { transform: translateY(100px); }
                }
            `}} />
        </div>
    );
}

