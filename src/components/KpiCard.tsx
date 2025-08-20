interface KpiCardProps {
  nombre: string;
  actual: string | number;
  objetivo: string | number;
  unidad: string;
}

export default function KpiCard({ nombre, actual, objetivo, unidad }: KpiCardProps) {
  const ok = objetivo == null ? true : Number(actual) >= Number(objetivo);

  return (
    <div
      className={`p-4 rounded-2xl min-w-[260px] min-h-[120px] max-w-[330px] shadow-lg border 
                  backdrop-blur-lg text-white transition-transform hover:scale-[1.03]`}
      style={{
        background: ok
          ? "linear-gradient(135deg, rgba(49,212,146,1), rgba(39,170,94,1))"
          : "linear-gradient(135deg, rgba(255,100,103,1), rgba(155,18,8,1))",
        borderColor: "rgba(255,255,255,0.3)",
      }}
    >
      <div className=" text-base font-semibold drop-shadow-sm">{nombre}</div>
      <div className="text-2xl font-extrabold drop-shadow-md">
        {actual}{unidad ? ` ${unidad}` : ''}
      </div>
      {objetivo != null && (
        <div className="text-sm font-medium opacity-90 drop-shadow-sm">
          🎯 Objetivo: {objetivo}{unidad ? ` ${unidad}` : ''}
        </div>
      )}
    </div>
  );
}
