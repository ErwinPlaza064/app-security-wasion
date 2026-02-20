import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function Toast() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');
    const [lastMsg, setLastMsg] = useState({ content: '', timestamp: 0 });

    useEffect(() => {
        const currentMsg = flash.success || flash.error;
        if (!currentMsg) return;

        // Si el mensaje es el mismo y ocurrió hace menos de 500ms, lo ignoramos
        const now = Date.now();
        if (currentMsg === lastMsg.content && (now - lastMsg.timestamp) < 500) {
            return;
        }

        if (flash.success) {
            setMessage(flash.success);
            setType('success');
            setLastMsg({ content: flash.success, timestamp: now });
            showToast();
        } else if (flash.error) {
            setMessage(flash.error);
            setType('error');
            setLastMsg({ content: flash.error, timestamp: now });
            showToast();
        }
    }, [flash]);

    const showToast = () => {
        // Reproducir sonido de notificación si está habilitado
        const soundEnabled = localStorage.getItem('toast_sound_enabled') !== 'false';
        
        if (soundEnabled) {
            const audio = new Audio('/sounds/notification.mp3');
            audio.volume = 0.5; // Volumen al 50%
            audio.play().catch(e => console.error("Error al reproducir audio:", e));
        }

        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(timer);
    };

    if (!visible) return null;

    return (
        <div className={`
            fixed top-20 md:top-24 left-4 right-4 md:left-auto md:right-8 z-[100] transition-all duration-500 transform
            ${visible ? 'translate-y-0 md:translate-x-0 opacity-100' : '-translate-y-8 md:translate-y-0 md:translate-x-full opacity-0'}
        `}>
            <div className={`
                relative overflow-hidden flex items-center p-4 md:p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border backdrop-blur-xl
                ${type === 'success' 
                    ? 'bg-emerald-50/90 border-emerald-100/50 text-emerald-900' 
                    : 'bg-rose-50/90 border-rose-100/50 text-rose-900'}
                w-full md:min-w-[320px] md:max-w-[450px] mx-auto
            `}>
                {/* Progress Bar Background */}
                <div className={`absolute bottom-0 left-0 h-1.5 w-full bg-black/5`}></div>
                
                {/* Progress Bar Fill */}
                <div 
                    className={`absolute bottom-0 left-0 h-1.5 progress-bar
                        ${type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}
                    `}
                ></div>

                <div className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center me-4 shrink-0
                    ${type === 'success' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}
                `}>
                    {type === 'success' ? (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </div>
                
                <div className="flex-1 pe-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-40 mb-1 leading-none">
                        {type === 'success' ? 'Operación Exitosa' : 'Aviso del Sistema'}
                    </p>
                    <p className="text-[13px] font-black tracking-tight leading-snug">
                        {message}
                    </p>
                </div>

                <button 
                    onClick={() => setVisible(false)}
                    className="p-2 rounded-xl hover:bg-black/5 transition-colors"
                >
                    <svg className="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                .progress-bar {
                    animation: progress 5s linear forwards;
                }
            `}} />
        </div>
    );
}
