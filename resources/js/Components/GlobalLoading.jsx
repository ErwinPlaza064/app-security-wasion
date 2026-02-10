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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-sm transition-all duration-300">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse"></div>
                
                <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-primary/10 flex flex-col items-center space-y-4 border border-primary/5">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                        
                        <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                        
                        <div className="absolute inset-2 bg-primary/5 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] animate-pulse">Procesando</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Sincronizando datos...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
