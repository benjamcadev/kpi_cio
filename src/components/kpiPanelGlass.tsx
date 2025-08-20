
import {useEffect, useRef} from 'react'
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
  

  const scrollRef = useRef<HTMLDivElement>(null);


   useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let position = 0;
    const step = 1; // píxeles por frame
    const interval = setInterval(() => {
      position += step;
      el.scrollTo({
        top: position,
        behavior: "smooth", // hace que sea progresivo
      });

      // Reinicia al llegar al final
      if (position >= el.scrollHeight - el.clientHeight) {
        position = 0;
      }
    }, 160); // cada 50ms

    return () => clearInterval(interval);
  }, []);



  return (
    

     
        <motion.div
         key="KpiPanelGlass"
         ref={scrollRef}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-0 right-0 bottom-0 w-96
            flex flex-col gap-4
            backdrop-blur-xl bg-white/20 border-l border-white/30
            shadow-2xl p-4 z-50 overflow-y-scroll scroll-smooth"
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
