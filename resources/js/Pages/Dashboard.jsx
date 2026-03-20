import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import DashboardHeader from './Dashboard/Partials/DashboardHeader';
import ModuleSearch from './Dashboard/Partials/ModuleSearch';
import ModuleGrid from './Dashboard/Partials/ModuleGrid';
import ActiveVisitorsTable from './Dashboard/Partials/ActiveVisitorsTable';
import ActiveVehiclesTable from './Dashboard/Partials/ActiveVehiclesTable';
import DashboardTabToggle from './Dashboard/Partials/DashboardTabToggle';
import ExitConfirmationModal from './Dashboard/Partials/ExitConfirmationModal';
import { modules } from '@/Constants/modules';

const EMPTY_VISITORS = [];
const EMPTY_VEHICLES = [];
const EMPTY_INCIDENTS = [];

export default function Dashboard({ activeVisitors = EMPTY_VISITORS, activeVehicles = EMPTY_VEHICLES, openIncidents = EMPTY_INCIDENTS }) {
    const { auth } = usePage().props;
    const [processing, setProcessing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [confirmExitModal, setConfirmExitModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [exitType, setExitType] = useState('person'); // 'person' or 'vehicle'
    const [activeTab, setActiveTab] = useState('persons'); // 'persons', 'vehicles', or 'resignations'
    const tableRef = useRef(null);
    const actionsRef = useRef(null);

    // Separar registros de acceso normales de renuncias/finiquitos
    const resignationTypes = ['resignation', 'settlement'];
    const pureVisitors = activeVisitors.filter(v => !resignationTypes.includes(v.type));
    const activeResignations = activeVisitors.filter(v => resignationTypes.includes(v.type));

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

    const confirmExit = (signature) => {
        if (selectedItem) {
            const routeName = exitType === 'person' ? 'access-logs.exit' : 'vehicle-logs.exit';
            router.patch(route(routeName, selectedItem.id), { signature }, {
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onSuccess: () => {
                    setConfirmExitModal(false);
                    setSelectedItem(null);
                }
            });
        }
    };

    const tabToggle = (
        <DashboardTabToggle 
            activeTab={activeTab} 
            onTabChange={(tab) => {
                setActiveTab(tab);
                scrollToTable();
            }}
            personsCount={pureVisitors.length}
            vehiclesCount={activeVehicles.length}
            resignationsCount={activeResignations.length}
        />
    );

    return (
        <AuthenticatedLayout>
            <Head title="Escritorio Operativo" />

            <div className="py-10 bg-[#fdfcf9] min-h-[calc(100vh-64px)] overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <DashboardHeader 
                        operatorName={auth.user.name} 
                        activePersons={pureVisitors.length}
                        activeVehicles={activeVehicles.length}
                        activeResignations={activeResignations.length}
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
                        {activeTab === 'persons' && (
                            <ActiveVisitorsTable 
                                visitors={pureVisitors} 
                                onExit={(visitor) => handleExit(visitor, 'person')} 
                                tabToggle={tabToggle}
                            />
                        )}
                        {activeTab === 'vehicles' && (
                            <ActiveVehiclesTable 
                                vehicles={activeVehicles} 
                                onExit={(vehicle) => handleExit(vehicle, 'vehicle')} 
                                tabToggle={tabToggle}
                            />
                        )}
                        {activeTab === 'resignations' && (
                            <ActiveVisitorsTable 
                                visitors={activeResignations} 
                                onExit={(visitor) => handleExit(visitor, 'person')} 
                                tabToggle={tabToggle}
                                title="Renuncias y Finiquitos"
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
