export default function FormProgress({ currentStep, peopleCount }) {
    return (
        <div className="mb-10 flex items-center justify-between px-2">
            <div className="flex items-center space-x-1">
                <span
                    className={`w-8 h-1.5 rounded-full transition-all duration-500 ${currentStep === 0 ? "bg-primary w-12" : "bg-gray-200"}`}
                ></span>
                {[...Array(peopleCount)].map((_, i) => (
                    <span
                        key={`step-${i}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${currentStep === i + 1 ? "bg-primary w-12" : currentStep > i + 1 ? "bg-emerald-400 w-4" : "bg-gray-200 w-4"}`}
                    ></span>
                ))}
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                {currentStep === 0
                    ? "DATOS DESTINO"
                    : `INTEGRANTE ${currentStep} / ${peopleCount}`}
            </span>
        </div>
    );
}
