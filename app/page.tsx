import fs from "node:fs/promises";
import path from "node:path";
import DropDashboard from "@/components/drop-dashboard";
import { dropSimulationConfig } from "@/data/drop-simulation.config";
import type { DropSimulationConfig } from "@/lib/drop-calculator";
import { parseMobDropText } from "@/lib/mob-drop-parser";

export const dynamic = "force-dynamic";

export default async function Home() {
  const config = dropSimulationConfig as DropSimulationConfig;
  const filePath = path.join(process.cwd(), "mob_drop_item.txt");
  const source = await fs.readFile(filePath, "utf8");
  const parsed = parseMobDropText(source, config.itemLabels);
  const mobCount = new Set(parsed.groups.map((group) => group.mobVnum)).size;
  const entryCount = parsed.groups.reduce((sum, group) => sum + group.entries.length, 0);
  const itemCount = Object.keys(parsed.itemLabels).length;

  return (
    <DropDashboard
      groups={parsed.groups}
      itemLabels={parsed.itemLabels}
      config={config}
      summary={{
        groupCount: parsed.groups.length,
        mobCount,
        entryCount,
        itemCount
      }}
    />
  );
}
