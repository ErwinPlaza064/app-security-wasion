import { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

export default function GlobalLoading() {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const unsubscribeStart = router.on('start', () => {
            setLoading(true);
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
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none">
            {/* Minimalist Overlay - Zero Blur for Performance */}
            <div className="absolute inset-0 bg-white/40 transition-opacity duration-300"></div>

            {/* Top Progress Line - High efficiency GPU acceleration */}
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-primary/5 overflow-hidden z-[10000]">
                <div className="h-full bg-primary/60 animate-[progress_1.5s_ease-in-out_infinite] will-change-transform shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]"></div>
            </div>

            <div className="relative flex flex-col items-center">
                {/* Ultra-light Geometric Spinner */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                    {/* Single Ring - No transparent gradients, just simple borders */}
                    <div className="absolute inset-0 border-2 border-primary/5 rounded-full"></div>
                    <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin will-change-transform"></div>
                    
                    {/* Pulsing Core - Minimal effort */}
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                </div>

                {/* Performance optimized Labels */}
                <div className="mt-5 text-center">
                    <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.4em] block">
                        Sistema
                    </span>
                    <span className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.2em] mt-1 block">
                        Procesando datos
                    </span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
}

