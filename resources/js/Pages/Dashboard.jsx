import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import DashboardHeader from './Dashboard/Partials/DashboardHeader';
import ModuleSearch from './Dashboard/Partials/ModuleSearch';
import ModuleGrid from './Dashboard/Partials/ModuleGrid';
import ActiveVisitorsTable from './Dashboard/Partials/ActiveVisitorsTable';
import ActiveVehiclesTable from './Dashboard/Partials/ActiveVehiclesTable';
import ExitConfirmationModal from './Dashboard/Partials/ExitConfirmationModal';
import { modules } from '@/Constants/modules';

export default function Dashboard({ activeVisitors = [], activeVehicles = [], openIncidents = [] }) {
    const { auth } = usePage().props;
    const { patch, processing } = useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmExitModal, setConfirmExitModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [exitType, setExitType] = useState('person'); // 'person' or 'vehicle'
    const [activeTab, setActiveTab] = useState('persons'); // 'persons' or 'vehicles'
    const tableRef = useRef(null);
    const actionsRef = useRef(null);

    useEffect(() => {
        actionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const scrollToTable = () => {
        tableRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleExit = (item, type = 'person') => {
        setSelectedItem(item);
        setExitType(type);
        setConfirmExitModal(true);
    };

    const confirmExit = () => {
        if (selectedItem) {
            const routeName = exitType === 'person' ? 'access-logs.exit' : 'vehicle-logs.exit';
            patch(route(routeName, selectedItem.id), {
                onSuccess: () => {
                    setConfirmExitModal(false);
                    setSelectedItem(null);
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
                        activePersons={activeVisitors.length}
                        activeVehicles={activeVehicles.length}
                        activeTab={activeTab}
                        onTabChange={(tab) => {
                            setActiveTab(tab);
                            scrollToTable();
                        }}
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

                    <div ref={tableRef} className="pt-8">
                        {activeTab === 'persons' ? (
                            <ActiveVisitorsTable 
                                visitors={activeVisitors} 
                                onExit={(visitor) => handleExit(visitor, 'person')} 
                            />
                        ) : (
                            <ActiveVehiclesTable 
                                vehicles={activeVehicles} 
                                onExit={(vehicle) => handleExit(vehicle, 'vehicle')} 
                            />
                        )}
                    </div>
                </div>
            </div>

            <ExitConfirmationModal 
                show={confirmExitModal} 
                onClose={() => setConfirmExitModal(false)} 
                item={selectedItem}
                type={exitType}
                onConfirm={confirmExit} 
                processing={processing} 
            />
        </AuthenticatedLayout>
    );
}
