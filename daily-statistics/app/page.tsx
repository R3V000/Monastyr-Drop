import DropDashboard from "@/components/drop-dashboard";
import { dropSimulationConfig } from "@/data/drop-simulation.config";
import type { DropSimulationConfig } from "@/lib/drop-calculator";

export default function Home() {
  const config = dropSimulationConfig as DropSimulationConfig;

  return (
    <DropDashboard
      config={config}
      defaultDropFileUrl="mob_drop_item.txt"
      defaultFileName="mob_drop_item.txt"
    />
  );
}
