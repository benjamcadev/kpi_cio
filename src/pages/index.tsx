import KpiPanelGlass from '@/components/kpiPanelGlass'
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion"


type Kpi = {
  nombre_KPI: string;
  actual: string;
  objetivo: string;
  unidad: string;
};

export default function Home() {
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [showKpis, setShowKpis] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/sheets");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: Kpi[] = await res.json();
        setKpis(data);
      } catch (err) {
        console.error("Error fetching KPI data:", err);
        setError(`No se pudo cargar la información de KPIs ${err}`);
      }

    }
    fetchData();

    //  refrescar cada 2-3 min
    const interval = setInterval(fetchData, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  //Effect para mostrar cada X segundos y ocultar
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setShowKpis(prev => !prev); // <--- usa el valor actual
      
  //   }, 10000);

  //   return () => clearInterval(intervalId); // limpieza al desmontar
  // }, []);

  if (error) {
    return (
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 p-6 bg-red-100 
                      text-red-800 border border-red-300 rounded-2xl shadow-lg z-50">
        {error}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 24 }}>
      {/* <FloatingButton onClick={() => setShowKpis(true)} /> */}

      {/* {showKpis && <KpiPanel kpis={kpis} onClose={() => setShowKpis(false)} />} */}

      <AnimatePresence>
        {showKpis && <KpiPanelGlass kpis={kpis} onClose={() => setShowKpis(false)} />}
      </AnimatePresence>


    </div>
  );



}

