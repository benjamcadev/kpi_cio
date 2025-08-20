import KpiCard from "./KpiCard";

interface KpiPanelProps {
    kpis: {
        nombre_KPI: string;
        actual: string | number;
        objetivo: string | number;
        unidad: string;
    }[];
    onClose: () => void;
}


export default function KpiPanel({ kpis, onClose }: KpiPanelProps) {

    return (
        <div className="fixed inset-0 z-40 flex items-start justify-start bg-black/10 backdrop-blur-lg p-4">
            <div className="bg-black/40 border border-white/20 rounded-2xl shadow-2xl p-6 w-96 max-h-[90vh] overflow-y-auto
                transform transition-transform duration-300 slide-in-right">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl text-amber-50 font-bold">Dashboard KPIs</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-200 hover:text-gray-700 font-bold text-lg"
                    >
                        ×
                    </button>
                </div>

                <div className="flex flex-wrap gap-4">
                    {kpis.map((kpi, i) => (
                        <KpiCard
                            key={i}
                            nombre={kpi.nombre_KPI}
                            actual={kpi.actual}
                            objetivo={kpi.objetivo}
                            unidad={kpi.unidad}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}