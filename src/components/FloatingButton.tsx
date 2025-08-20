
interface FloatingButtonProps {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-80 z-50 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-colors"
    >
      KPIs
    </button>
  );
}
