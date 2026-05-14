import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trophy, Home } from "lucide-react";

export function WinModal({ open, onClose }) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-white border-slate-200 shadow-2xl text-center max-w-100">
        <AlertDialogHeader className="items-center gap-2">
          {/* Animated/Styled Trophy Icon */}
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-2 animate-bounce">
            <Trophy className="w-10 h-10 text-indigo-600" />
          </div>

          <AlertDialogTitle className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
            Victory <span className="text-indigo-600">Arena</span>
          </AlertDialogTitle>

          <AlertDialogDescription className="text-slate-500 text-base">
            Your opponent fled! You have won the match.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="justify-center mt-6">
          <AlertDialogAction
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-black px-10 py-6 rounded-xl transition-all  flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
