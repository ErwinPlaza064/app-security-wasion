import { useRef, useState, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function SignaturePad({ index, value, onChange, error, label = "Firma Digital (Opcional)" }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = "#0c1869";
        ctx.beginPath();
        
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        
        ctx.moveTo(
            (clientX - rect.left) * scaleX,
            (clientY - rect.top) * scaleY
        );
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        
        ctx.lineTo(
            (clientX - rect.left) * scaleX,
            (clientY - rect.top) * scaleY
        );
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const signatureData = canvas.toDataURL();
        onChange(signatureData);
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onChange("");
    };

    // Initialize canvas if there's an existing value (e.g., when coming back to the step)
    useEffect(() => {
        if (value && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
            img.src = value;
        }
    }, []);

    return (
        <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${label.includes('Opcional') ? 'bg-gray-300' : 'bg-primary'}`}></div>
                    <InputLabel
                        value={label}
                        className="text-[10px] font-black text-gray-900 uppercase tracking-widest"
                    />
                </div>
                <button
                    type="button"
                    onClick={clearSignature}
                    className="text-[9px] font-black text-red-500 uppercase underline"
                >
                    Borrar
                </button>
            </div>
            <div className="border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/50 h-[200px] relative overflow-hidden">
                <canvas
                    ref={canvasRef}
                    width={1200}
                    height={200}
                    className="w-full h-full cursor-crosshair touch-none relative z-10"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseOut={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />
                {!value && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">
                            Firme aquí
                        </span>
                    </div>
                )}
            </div>
            <InputError message={error} />
        </div>
    );
}
