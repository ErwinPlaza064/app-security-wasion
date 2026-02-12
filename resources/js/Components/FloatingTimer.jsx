import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function FloatingTimer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkStorage = () => {
            const state = localStorage.getItem('patrol_state');
            const running = localStorage.getItem('patrol_running') === 'true';
            const startTime = parseInt(localStorage.getItem('patrol_start_timestamp'));
            
            setIsVisible(state === 'running');
            setIsRunning(running);

            if (running && startTime) {
                const now = Date.now();
                const elapsed = Math.floor((now - startTime) / 1000);
                setSeconds(elapsed >= 0 ? elapsed : 0);
            }
        };

        checkStorage();
        const intervalId = setInterval(checkStorage, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (!isVisible) return null;

    return (
        <Link 
            href={route('patrols.create')}
            className="fixed bottom-6 right-6 z-[100] group"
        >
            <div className="relative">
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                
                <div className="relative flex items-center bg-gray-900 text-white p-1 rounded-full shadow-2xl shadow-primary/40 border border-white/10 hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    
                    <div className="px-4 pr-6 flex flex-col">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">En Curso</span>
                        <span className="text-lg font-black tracking-tighter tabular-nums leading-none">
                            {formatTime(seconds)}
                        </span>
                    </div>

                    {/* Tooltip hint */}
                    <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-gray-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-white/10 text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap shadow-xl">
                            Volver al Recorrido
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
