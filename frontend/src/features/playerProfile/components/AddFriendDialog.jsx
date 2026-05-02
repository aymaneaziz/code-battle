import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserPlus, Search } from "lucide-react";

export function AddFriendDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
        >
          <UserPlus className="h-4 w-4 mr-2" /> Add Friend
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Add a Friend</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 py-4">
          <Input
            placeholder="Enter username..."
            className="focus-visible:ring-slate-400"
          />
          <Button className="bg-slate-900 text-white cursor-pointer">
            <Search className="h-4 w-4 " />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
