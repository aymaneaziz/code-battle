import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const IdentitySection = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold border-b pb-2">PLAYER IDENTITY</h2>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="e.g. ShadowHunter"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Country / Region</Label>
          <Input
            id="address"
            name="address"
            placeholder="Morocco"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;
