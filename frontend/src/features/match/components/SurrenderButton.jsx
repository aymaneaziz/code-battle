import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react"; // Matching the icon style of your UI

export function SurrenderButton({ onSurrender }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red-200 text-red-600 cursor-pointer hover:bg-red-50 hover:text-red-700 transition-all font-bold"
        >
          <Flag className="w-4 h-4 mr-2" />
          Surrender
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white border-slate-200 shadow-2xl max-w-100">
        <AlertDialogHeader className="items-center text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-2">
            <Flag className="w-6 h-6 text-red-500" />
          </div>
          <AlertDialogTitle className="text-xl font-black text-slate-900 tracking-tight">
            GIVE UP?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500">
            Surrendering results in an immediate{" "}
            <span className="text-red-600 font-bold">
              ELO loss and and ends your current streak{" "}
            </span>
            . Are you sure you want to exit the arena?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          <AlertDialogCancel className="bg-slate-100 border-none text-slate-600 cursor-pointer hover:bg-slate-200 font-bold flex-1">
            Keep Fighting
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onSurrender}
            className="bg-red-600 hover:bg-red-700 text-white font-bold flex-1 cursor-pointer"
          >
            Confirm Defeat
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
