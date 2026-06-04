import type { DropEntry, DropGroup } from "@/lib/mob-drop-parser";

export type CalculationMode = "auto" | "spawn" | "dungeon";
export type ResolvedCalculationMode = Exclude<CalculationMode, "auto">;
export type SpawnGroup = {
  spots: number;
  respawnMinutes: number;
};

export type MobOverride = {
  calculationMode?: CalculationMode;
  displayName?: string;
  channels?: number;
  spawnsPerChannel?: number;
  respawnMinutes?: number;
  uptimeHours?: number;
  killsPerAppearance?: number;
  spawnGroups?: SpawnGroup[];
  competitionShare?: number;
  manualDailyKills?: number | null;
  dungeonRunsPerDay?: number;
  killsPerDungeon?: number;
  mobLevel?: number | null;
};

export type DropSimulationConfig = {
  global: {
    itemRandRange?: number;
  };
  defaults: Omit<Required<MobOverride>, "displayName">;
  itemLabels: Record<string | number, string>;
  categories: Array<{
    id: string;
    label: string;
    itemVnums: number[];
  }>;
  mobOverrides: Record<string | number, MobOverride>;
};

export type DashboardSettings = {
  typeFilter: "all" | "drop" | "limit" | "kill";
  onlyConfigured: boolean;
};

export type ItemOption = {
  key: string;
  vnum: number;
  label: string;
  entryCount: number;
  mobCount: number;
};

export type SourceOption = {
  key: string;
  mobVnum: number;
  label: string;
  typeSet: string[];
  calculationMode: ResolvedCalculationMode;
  groupCount: number;
  itemCount: number;
  dailyKills: number;
  configured: boolean;
};

export type ComparisonRow = {
  mobVnum: number;
  mobName: string;
  calculationMode: ResolvedCalculationMode;
  groups: string[];
  typeSet: string[];
  levelLimit: number | null;
  channels: number;
  appearancesPerDay: number;
  dungeonRunsPerDay: number;
  dailyKills: number;
  expectedPerKill: number;
  expectedDaily: number;
  matchingEntries: number;
  averageConfiguredPercent: number;
  configured: boolean;
};

export type SourceDropRow = {
  itemVnum: number;
  itemName: string;
  typeSet: string[];
  matchingEntries: number;
  configuredPoints: number;
  expectedPerKill: number;
  expectedDaily: number;
};

const calibratedDropPointsForGuaranteedDrop = 205.15158422612265;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function safeNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function resolveCalculationMode(group: DropGroup, override: MobOverride): ResolvedCalculationMode {
  const mode = override.calculationMode || "auto";

  if (mode === "spawn" || mode === "dungeon") {
    return mode;
  }

  return group.type === "limit" ? "dungeon" : "spawn";
}

export function getMobProfile(
  group: DropGroup,
  config: DropSimulationConfig
) {
  const override = config.mobOverrides[group.mobVnum] || {};
  const defaults = config.defaults;
  const calculationMode = resolveCalculationMode(group, override);
  const channels = safeNumber(override.channels, defaults.channels);
  const spawnsPerChannel = safeNumber(override.spawnsPerChannel, defaults.spawnsPerChannel);
  const respawnMinutes = safeNumber(override.respawnMinutes, defaults.respawnMinutes);
  const uptimeHours = safeNumber(override.uptimeHours, defaults.uptimeHours);
  const killsPerAppearance = safeNumber(override.killsPerAppearance, defaults.killsPerAppearance);
  const spawnGroups = Array.isArray(override.spawnGroups) ? override.spawnGroups : defaults.spawnGroups;
  const competitionShare = safeNumber(override.competitionShare, defaults.competitionShare);
  const dungeonRunsPerDay = safeNumber(override.dungeonRunsPerDay, defaults.dungeonRunsPerDay);
  const killsPerDungeon = safeNumber(override.killsPerDungeon, defaults.killsPerDungeon);
  const manualDailyKills =
    typeof override.manualDailyKills === "number" ? override.manualDailyKills : defaults.manualDailyKills;

  const appearancesPerDay =
    spawnGroups.length > 0
      ? channels *
        uptimeHours *
        60 *
        killsPerAppearance *
        spawnGroups.reduce((sum, group) => {
          const spots = safeNumber(group.spots, 0);
          const groupRespawnMinutes = safeNumber(group.respawnMinutes, 0);
          return groupRespawnMinutes > 0 ? sum + spots / groupRespawnMinutes : sum;
        }, 0)
      : respawnMinutes > 0
        ? (channels * spawnsPerChannel * uptimeHours * 60 * killsPerAppearance) / respawnMinutes
        : 0;

  const modeledDailyKills =
    calculationMode === "dungeon" ? dungeonRunsPerDay * killsPerDungeon : appearancesPerDay;
  const dailyKills = (manualDailyKills ?? modeledDailyKills) * competitionShare;

  return {
    displayName: override.displayName || group.mobComment || group.groupName || `Mob ${group.mobVnum}`,
    calculationMode,
    channels,
    spawnsPerChannel,
    respawnMinutes,
    uptimeHours,
    killsPerAppearance,
    spawnGroups,
    competitionShare,
    manualDailyKills,
    appearancesPerDay,
    dungeonRunsPerDay,
    killsPerDungeon,
    dailyKills,
    mobLevel: override.mobLevel ?? defaults.mobLevel,
    configured: Boolean(config.mobOverrides[group.mobVnum])
  };
}

function dropEntryExpectedPerKill(
  entry: DropEntry,
  group: DropGroup,
  config: DropSimulationConfig
) {
  if (group.type === "drop") {
    return clamp(entry.percent / calibratedDropPointsForGuaranteedDrop, 0, 1) * entry.count;
  }

  if (group.type === "limit") {
    return clamp(entry.percent / 100, 0, 1) * entry.count;
  }

  const randRange = safeNumber(config.global.itemRandRange, 4000000);
  const chance = (entry.percent * 10000) / randRange;
  return clamp(chance, 0, 1) * entry.count;
}

function killGroupExpectedPerKill(
  matchingEntries: DropEntry[],
  group: DropGroup,
  config: DropSimulationConfig
) {
  const randRange = safeNumber(config.global.itemRandRange, 4000000);
  const killDrop = group.killDrop && group.killDrop > 0 ? group.killDrop : 1;
  const totalWeight = group.entries.reduce((sum, current) => sum + Math.max(0, current.percent), 0) || 1;
  const selectedWeightedCount = matchingEntries.reduce(
    (sum, current) => sum + Math.max(0, current.percent) * current.count,
    0
  );
  const groupChance = clamp(40000 / killDrop / randRange, 0, 1);

  return groupChance * (selectedWeightedCount / totalWeight);
}

export function buildItemOptions(groups: DropGroup[], itemLabels: Record<number, string>): ItemOption[] {
  const options = new Map<number, ItemOption>();

  groups.forEach((group) => {
    const seenInGroup = new Set<number>();

    group.entries.forEach((entry) => {
      const existing =
        options.get(entry.itemVnum) ||
        ({
          key: `item:${entry.itemVnum}`,
          vnum: entry.itemVnum,
          label: itemLabels[entry.itemVnum] || entry.comment || `Item ${entry.itemVnum}`,
          entryCount: 0,
          mobCount: 0
        } satisfies ItemOption);

      existing.entryCount += 1;
      if (!seenInGroup.has(entry.itemVnum)) {
        existing.mobCount += 1;
        seenInGroup.add(entry.itemVnum);
      }
      options.set(entry.itemVnum, existing);
    });
  });

  return Array.from(options.values()).sort((a, b) => a.label.localeCompare(b.label, "pl"));
}

export function buildSourceOptions(groups: DropGroup[], config: DropSimulationConfig): SourceOption[] {
  const options = new Map<number, SourceOption>();
  const itemSets = new Map<number, Set<number>>();

  groups.forEach((group) => {
    if (!group.mobVnum || group.entries.length === 0) {
      return;
    }

    const profile = getMobProfile(group, config);
    const existing =
      options.get(group.mobVnum) ||
      ({
        key: `mob:${group.mobVnum}`,
        mobVnum: group.mobVnum,
        label: profile.displayName,
        typeSet: [],
        calculationMode: profile.calculationMode,
        groupCount: 0,
        itemCount: 0,
        dailyKills: profile.dailyKills,
        configured: profile.configured
      } satisfies SourceOption);

    const itemSet = itemSets.get(group.mobVnum) || new Set<number>();
    group.entries.forEach((entry) => itemSet.add(entry.itemVnum));
    itemSets.set(group.mobVnum, itemSet);

    existing.groupCount += 1;
    existing.typeSet = Array.from(new Set([...existing.typeSet, group.type]));
    existing.itemCount = itemSet.size;

    options.set(group.mobVnum, existing);
  });

  return Array.from(options.values()).sort((a, b) => a.label.localeCompare(b.label, "pl"));
}

export function computeSourceDropRows(
  groups: DropGroup[],
  mobVnum: number,
  itemLabels: Record<number, string>,
  config: DropSimulationConfig
): SourceDropRow[] {
  const rows = new Map<number, SourceDropRow>();

  groups
    .filter((group) => group.mobVnum === mobVnum)
    .forEach((group) => {
      const profile = getMobProfile(group, config);
      const entriesByItem = new Map<number, DropEntry[]>();

      group.entries.forEach((entry) => {
        entriesByItem.set(entry.itemVnum, [...(entriesByItem.get(entry.itemVnum) || []), entry]);
      });

      entriesByItem.forEach((entries, itemVnum) => {
        const expectedPerKill =
          group.type === "kill"
            ? killGroupExpectedPerKill(entries, group, config)
            : entries.reduce((sum, entry) => sum + dropEntryExpectedPerKill(entry, group, config), 0);

        const existing =
          rows.get(itemVnum) ||
          ({
            itemVnum,
            itemName: itemLabels[itemVnum] || entries[0]?.comment || `Item ${itemVnum}`,
            typeSet: [],
            matchingEntries: 0,
            configuredPoints: 0,
            expectedPerKill: 0,
            expectedDaily: 0
          } satisfies SourceDropRow);

        existing.typeSet = Array.from(new Set([...existing.typeSet, group.type]));
        existing.matchingEntries += entries.length;
        existing.configuredPoints += entries.reduce((sum, entry) => sum + entry.percent, 0);
        existing.expectedPerKill += expectedPerKill;
        existing.expectedDaily += expectedPerKill * profile.dailyKills;

        rows.set(itemVnum, existing);
      });
    });

  return Array.from(rows.values()).sort((a, b) => b.expectedDaily - a.expectedDaily);
}

export function computeComparisonRows(
  groups: DropGroup[],
  selectedVnums: number[],
  config: DropSimulationConfig,
  settings: DashboardSettings
): ComparisonRow[] {
  const selected = new Set(selectedVnums);
  const rows = new Map<number, ComparisonRow>();

  groups.forEach((group) => {
    if (!group.mobVnum) {
      return;
    }

    if (settings.typeFilter !== "all" && group.type !== settings.typeFilter) {
      return;
    }

    const matchingEntries = group.entries.filter((entry) => selected.has(entry.itemVnum));
    if (matchingEntries.length === 0) {
      return;
    }

    const profile = getMobProfile(group, config);
    if (settings.onlyConfigured && !profile.configured) {
      return;
    }

    let expectedPerKill = 0;

    if (group.type === "kill") {
      expectedPerKill += killGroupExpectedPerKill(matchingEntries, group, config);
    } else {
      matchingEntries.forEach((entry) => {
        expectedPerKill += dropEntryExpectedPerKill(entry, group, config);
      });
    }

    const existing = rows.get(group.mobVnum);
    const averageConfiguredPercent =
      matchingEntries.reduce((sum, entry) => sum + entry.percent, 0) / matchingEntries.length;

    if (existing) {
      existing.expectedPerKill += expectedPerKill;
      existing.expectedDaily += expectedPerKill * profile.dailyKills;
      existing.matchingEntries += matchingEntries.length;
      existing.averageConfiguredPercent =
        (existing.averageConfiguredPercent + averageConfiguredPercent) / 2;
      existing.groups = Array.from(new Set([...existing.groups, group.groupName]));
      existing.typeSet = Array.from(new Set([...existing.typeSet, group.type]));
      existing.levelLimit =
        existing.levelLimit === null
          ? group.levelLimit
          : group.levelLimit === null
            ? existing.levelLimit
            : Math.min(existing.levelLimit, group.levelLimit);
      return;
    }

    rows.set(group.mobVnum, {
      mobVnum: group.mobVnum,
      mobName: profile.displayName,
      calculationMode: profile.calculationMode,
      groups: [group.groupName],
      typeSet: [group.type],
      levelLimit: group.levelLimit,
      channels: profile.channels,
      appearancesPerDay: profile.appearancesPerDay,
      dungeonRunsPerDay: profile.dungeonRunsPerDay,
      dailyKills: profile.dailyKills,
      expectedPerKill,
      expectedDaily: expectedPerKill * profile.dailyKills,
      matchingEntries: matchingEntries.length,
      averageConfiguredPercent,
      configured: profile.configured
    });
  });

  return Array.from(rows.values()).sort((a, b) => b.expectedDaily - a.expectedDaily);
}

export function formatCompact(value: number, fractionDigits = 1) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat("pl-PL", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: value > 0 && value < 1 ? fractionDigits : 0
  }).format(value);
}
