import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#FFF7F2] overflow-hidden selection:bg-[#0C1869] selection:text-white pb-12">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0C1869] opacity-[0.03] blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#0C1869] opacity-[0.02] blur-3xl"></div>
            </div>

            <div className="relative z-10 animate-fade-in-up">
                <div className="flex flex-col items-center mb-8">
                    <h2 className="mt-4 text-3xl font-bold text-[#0C1869]">Wasion Security</h2>
                </div>

                <div className="w-full sm:max-w-md bg-white/70 backdrop-blur-xl px-8 py-10 shadow-2xl shadow-[#0C1869]/5 sm:rounded-[2rem] border border-white">
                    {children}
                </div>
                
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Wasion Security System
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
            ` }} />
        </div>
    );
}
