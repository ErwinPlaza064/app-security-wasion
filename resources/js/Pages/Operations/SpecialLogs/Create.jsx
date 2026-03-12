import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

const EMPTY_AREAS = [];

export default function Create({ type, areas = EMPTY_AREAS }) {
    const getLocalDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        type: type || 'no_badge',
        employee_name: '',
        employee_id: '',
        department: '',
        position: '',
        suspension_reason: '',
        direct_supervisor: '',
        notes: '',
        happened_at: getLocalDateTime(),
    });

    const titles = {
        resignation: 'Registro de Renuncia',
        settlement: 'Registro de Finiquito',
        no_badge: 'Acceso de Colaborador Sin Gafete',
        clearance: 'Pase de Salida',
    };

    const isResignationOrSettlement = data.type === 'resignation' || data.type === 'settlement';

    const submit = (e) => {
        e.preventDefault();
        clearErrors();
        let hasErrors = false;

        if (!data.employee_name) {
            setError('employee_name', 'El nombre del empleado es obligatorio');
            hasErrors = true;
        }
        if (!data.department) {
            setError('department', 'El departamento es obligatorio');
            hasErrors = true;
        }
        if (data.type === 'no_badge' && !data.suspension_reason) {
            setError('suspension_reason', 'El motivo del ingreso es obligatorio');
            hasErrors = true;
        }
        if (!data.happened_at) {
            setError('happened_at', 'La fecha y hora son obligatorias');
            hasErrors = true;
        }

        if (hasErrors) return;

        post(route('special-logs.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title={titles[data.type] || 'Registros Especiales'} />

            <div className="py-12 bg-[#fdfcf9] min-h-[calc(100vh-64px)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Link href={route('dashboard')} className="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-widest transition-colors">Dashboard</Link>
                                <span className="text-[10px] text-gray-300">/</span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Operaciones</span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{titles[data.type]}</h1>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-amber-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Selector de Tipo (Solo si es Renuncia o Finiquito) */}
                        {isResignationOrSettlement && (
                            <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'resignation')}
                                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                        data.type === 'resignation' 
                                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' 
                                        : 'text-gray-400 hover:bg-gray-50'
                                    }`}
                                >
                                    Renuncia
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'settlement')}
                                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                        data.type === 'settlement' 
                                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' 
                                        : 'text-gray-400 hover:bg-gray-50'
                                    }`}
                                >
                                    Finiquito
                                </button>
                            </div>
                        )}

                        {/* Sección: Información del Empleado */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Datos del Colaborador</h2>
                            </div>

                            <div className="space-y-1.5">
                                <InputLabel htmlFor="employee_name" value="Nombre del Empleado" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                <TextInput
                                    id="employee_name"
                                    className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-amber-500/10 rounded-xl py-3 px-4 transition-all"
                                    value={data.employee_name}
                                    onChange={(e) => setData('employee_name', e.target.value.replace(/\b\w/g, l => l.toUpperCase()))}
                                    placeholder="Nombre completo..."
                                />
                                <InputError message={errors.employee_name} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="employee_id" value="Nº de Nómina" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="employee_id"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-amber-500/10 rounded-xl py-3 px-4 transition-all font-mono"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        placeholder="Ingrese número..."
                                    />
                                    <InputError message={errors.employee_id} />
                                </div>

                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="department" value="Departamento / Área" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <select
                                        id="department"
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 transition-all text-sm font-bold appearance-none"
                                    >
                                        <option value="">Seleccione área...</option>
                                        {areas.map(area => (
                                            <option key={area.id} value={area.name}>{area.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.department} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="position" value="Puesto" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="position"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-amber-500/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        placeholder="Cargo del colaborador..."
                                    />
                                    <InputError message={errors.position} />
                                </div>

                                {isResignationOrSettlement && (
                                    <div className="space-y-1.5">
                                        <InputLabel htmlFor="direct_supervisor" value="Jefe Directo" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                        <TextInput
                                            id="direct_supervisor"
                                            className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-amber-500/10 rounded-xl py-3 px-4 transition-all"
                                            value={data.direct_supervisor}
                                            onChange={(e) => setData('direct_supervisor', e.target.value.replace(/\b\w/g, l => l.toUpperCase()))}
                                            placeholder="Nombre del jefe..."
                                        />
                                        <InputError message={errors.direct_supervisor} />
                                    </div>
                                )}
                            </div>

                            {data.type === 'settlement' && (
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="suspension_reason" value="Motivo del Finiquito" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <TextInput
                                        id="suspension_reason"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-amber-500/10 rounded-xl py-3 px-4 transition-all"
                                        value={data.suspension_reason}
                                        onChange={(e) => setData('suspension_reason', e.target.value)}
                                        placeholder="Razón del finiquito..."
                                    />
                                    <InputError message={errors.suspension_reason} />
                                </div>
                            )}
                        </div>

                        {/* Sección: Detalles */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                            <div className="flex items-center space-x-2 border-b border-gray-50 pb-4 mb-2">
                                <div className="w-1.5 h-6 bg-gray-900 rounded-full"></div>
                                <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Información del Registro</h2>
                            </div>

                            <div className="space-y-1.5">
                                <InputLabel htmlFor="happened_at" value="Fecha y Hora" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                <input
                                    id="happened_at"
                                    type="datetime-local"
                                    className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-amber-500/10 rounded-xl py-3 px-4 transition-all text-sm"
                                    value={data.happened_at}
                                    onChange={(e) => setData('happened_at', e.target.value)}
                                />
                                <InputError message={errors.happened_at} />
                            </div>

                            {data.type === 'no_badge' && (
                                <div className="space-y-1.5">
                                    <InputLabel htmlFor="suspension_reason" value="Motivo del Ingreso" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                    <select
                                        id="suspension_reason"
                                        className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-amber-500/10 rounded-xl py-3 px-4 transition-all text-sm font-bold appearance-none"
                                        value={data.suspension_reason}
                                        onChange={(e) => setData('suspension_reason', e.target.value)}
                                    >
                                        <option value="">Seleccione motivo...</option>
                                        <option value="Olvido">Olvido</option>
                                        <option value="Extravió">Extravió</option>
                                        <option value="No entregado">No entregado</option>
                                    </select>
                                    <InputError message={errors.suspension_reason} />
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <InputLabel htmlFor="notes" value="Notas Adicionales" className="text-[10px] font-black text-gray-400 uppercase tracking-widest ms-1" />
                                <textarea
                                    id="notes"
                                    className="block w-full bg-gray-50 border-none focus:ring-2 focus:ring-amber-500/10 rounded-xl py-3 px-4 transition-all text-sm min-h-[120px]"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder={
                                        data.type === 'resignation' ? "Detalles adicionales de la baja..." : 
                                        data.type === 'settlement' ? "Detalles del finiquito..." :
                                        data.type === 'no_badge' ? "Observaciones adicionales sobre el ingreso sin gafete..." :
                                        "Detalles adicionales..."
                                    }
                                />
                                <InputError message={errors.notes} />
                            </div>
                        </div>

                        <div className="pt-4 flex space-x-4">
                            <Link 
                                href={route('dashboard')}
                                className="flex-1 flex justify-center py-4 rounded-xl border border-gray-100 text-gray-400 font-black uppercase text-xs tracking-widest hover:bg-gray-50 transition-all"
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton 
                                className="flex-[2] justify-center py-4 rounded-xl shadow-xl shadow-amber-500/20 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-[0.2em] transition-all"
                                disabled={processing}
                            >
                                Guardar Registro Especial
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
