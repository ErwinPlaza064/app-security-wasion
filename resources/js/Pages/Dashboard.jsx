import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import DashboardHeader from './Dashboard/Partials/DashboardHeader';
import ModuleSearch from './Dashboard/Partials/ModuleSearch';
import ModuleGrid from './Dashboard/Partials/ModuleGrid';
import ActiveVisitorsTable from './Dashboard/Partials/ActiveVisitorsTable';
import ExitConfirmationModal from './Dashboard/Partials/ExitConfirmationModal';
import { modules } from '@/Constants/modules';

export default function Dashboard({ activeVisitors = [], openIncidents = [] }) {
    const { auth } = usePage().props;
    const { patch, processing } = useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmExitModal, setConfirmExitModal] = useState(false);
    const [selectedVisitor, setSelectedVisitor] = useState(null);
    const tableRef = useRef(null);
    const actionsRef = useRef(null);

    useEffect(() => {
        actionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const scrollToTable = () => {
        tableRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleExit = (visitor) => {
        setSelectedVisitor(visitor);
        setConfirmExitModal(true);
    };

    const confirmExit = () => {
        if (selectedVisitor) {
            patch(route('access-logs.exit', selectedVisitor.id), {
                onSuccess: () => {
                    setConfirmExitModal(false);
                    setSelectedVisitor(null);
                }
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Escritorio Operativo" />

            <div className="py-10 bg-[#fdfcf9] min-h-[calc(100vh-64px)] overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <DashboardHeader 
                        operatorName={auth.user.name} 
                        activeCount={activeVisitors.length} 
                        onScrollToTable={scrollToTable} 
                    />

                    <ModuleSearch 
                        value={searchTerm} 
                        onChange={setSearchTerm} 
                    />

                    <div ref={actionsRef}>
                        <ModuleGrid 
                            modules={modules} 
                            searchTerm={searchTerm} 
                        />
                    </div>

                    <div ref={tableRef}>
                        <ActiveVisitorsTable 
                            visitors={activeVisitors} 
                            onExit={handleExit} 
                        />
                    </div>
                </div>
            </div>

            <ExitConfirmationModal 
                show={confirmExitModal} 
                onClose={() => setConfirmExitModal(false)} 
                visitor={selectedVisitor} 
                onConfirm={confirmExit} 
                processing={processing} 
            />
        </AuthenticatedLayout>
    );
}
