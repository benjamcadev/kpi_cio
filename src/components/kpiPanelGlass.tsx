
import { motion } from "framer-motion"


import KpiCard from "./KpiCard";

interface KpiPanelGlassProps {
  kpis: {
    nombre_KPI: string;
    actual: string | number;
    objetivo: string | number;
    unidad: string;
  }[];
  onClose: () => void;
}




export default function KpiPanelGlass({ kpis }: KpiPanelGlassProps) {
  

  return (
    

     
        <motion.div
         key="KpiPanelGlass"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-0 right-0 bottom-0 w-96
            flex flex-col gap-4
            backdrop-blur-xl bg-white/20 border-l border-white/30
            shadow-2xl p-4 z-50"
        >
          {kpis.map((kpi, idx) => (
            <KpiCard
              key={idx}
              nombre={kpi.nombre_KPI}
              actual={kpi.actual}
              objetivo={kpi.objetivo}
              unidad={kpi.unidad}
            />
          ))}
        </motion.div>

  
  )
}
