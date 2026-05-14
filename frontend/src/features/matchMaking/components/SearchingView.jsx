import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export function SearchingView({ onCancel }) {
  const [canCancel, setCanCancel] = useState(false);

  // Enable the button after a 1-second timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanCancel(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
        <h2 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
          Finding Match
        </h2>
        <p className="text-slate-400 text-sm">Searching for an opponent ....</p>
      </div>

      <Button
        variant="outline"
        onClick={onCancel}
        disabled={!canCancel} // Button is disabled for the first second
        className={`border-red-300 text-red-500 hover:bg-red-50 transition-opacity ${
          !canCancel ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Cancel
      </Button>
    </div>
  );
}
