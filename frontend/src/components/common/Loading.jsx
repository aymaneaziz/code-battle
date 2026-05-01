import { Loader2 } from "lucide-react";
import React from "react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen gap-2 text-gray-400">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">Loading...</span>
    </div>
  );
};
