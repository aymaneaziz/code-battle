import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const IdentitySection = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 bg-green-500"></div>
        <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900">
          Player Identity
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-widest text-gray-800 ml-1">
            Display Name<b className="text-red-600 ">*</b>{" "}
          </Label>
          <Input
            name="displayName"
            className="bg-white border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/20 text-gray-900 shadow-sm"
            value={formData.displayName}
            onChange={handleChange}
          />
          <span className="text-xs  tracking-widest text-gray-500 ml-1">
            3-18 chars. Letters, numbers, underscores only. This is your battle
            name.
          </span>
        </div>
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-widest text-gray-800 ml-1">
            Username<b className="text-red-600 ">*</b>
          </Label>
          <Input
            name="username"
            className="bg-white border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/20 text-gray-900 shadow-sm"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className="text-xs uppercase tracking-widest text-gray-800 ml-1">
            Countery / Region
          </Label>
          <Input
            name="location"
            placeholder="Morocco "
            className="bg-white border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/20 text-gray-900 shadow-sm"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;
