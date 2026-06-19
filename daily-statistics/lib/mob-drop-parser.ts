export type DropType = "drop" | "limit" | "kill" | "thiefgloves" | string;

export type DropEntry = {
  slot: number;
  itemVnum: number;
  count: number;
  percent: number;
  rarePercent: number | null;
  comment: string;
  sourceLine: number;
};

export type DropGroup = {
  id: string;
  groupName: string;
  mobVnum: number;
  mobComment: string;
  type: DropType;
  levelLimit: number | null;
  killDrop: number | null;
  entries: DropEntry[];
  startLine: number;
};

export type ParsedDropFile = {
  groups: DropGroup[];
  itemLabels: Record<number, string>;
};

function splitComment(line: string) {
  const commentIndex = line.indexOf("//");

  if (commentIndex === -1) {
    return { code: line, comment: "" };
  }

  return {
    code: line.slice(0, commentIndex),
    comment: line.slice(commentIndex + 2).trim()
  };
}

function parseNumber(value: string | undefined) {
  if (!value) {
    return null;
  }

  const normalized = value.replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function readableComment(comment: string) {
  return comment.replace(/\s+/g, " ").replace(/[-_]+/g, " ").trim();
}

export function parseMobDropText(
  text: string,
  configuredItemLabels: Record<string | number, string> = {}
): ParsedDropFile {
  const groups: DropGroup[] = [];
  const itemLabels: Record<number, string> = {};
  const configuredLabels = new Map<number, string>();

  Object.entries(configuredItemLabels).forEach(([vnum, label]) => {
    const parsed = Number(vnum);
    if (Number.isFinite(parsed)) {
      configuredLabels.set(parsed, label);
      itemLabels[parsed] = label;
    }
  });

  let current: DropGroup | null = null;

  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const sourceLine = index + 1;
    const { code, comment } = splitComment(line);
    const trimmed = code.trim();

    const groupMatch = trimmed.match(/^Group\s+(.+)$/i);
    if (groupMatch) {
      if (current && current.mobVnum > 0) {
        groups.push(current);
      }

      const groupName = groupMatch[1].trim();
      current = {
        id: `${sourceLine}-${groupName}`,
        groupName,
        mobVnum: 0,
        mobComment: "",
        type: "drop",
        levelLimit: null,
        killDrop: null,
        entries: [],
        startLine: sourceLine
      };
      continue;
    }

    if (!current || trimmed === "" || trimmed === "{") {
      continue;
    }

    if (trimmed === "}") {
      if (current.mobVnum > 0) {
        groups.push(current);
      }
      current = null;
      continue;
    }

    const tokens = trimmed.split(/\s+/);
    const key = tokens[0]?.toLowerCase();

    if (key === "mob") {
      const mobVnum = parseNumber(tokens[1]);
      if (mobVnum !== null) {
        current.mobVnum = mobVnum;
      }
      if (comment) {
        current.mobComment = readableComment(comment);
      }
      continue;
    }

    if (key === "type") {
      current.type = (tokens[1] || "drop").toLowerCase();
      continue;
    }

    if (key === "level_limit") {
      current.levelLimit = parseNumber(tokens[1]);
      continue;
    }

    if (key === "kill_drop") {
      current.killDrop = parseNumber(tokens[1]);
      continue;
    }

    const slot = parseNumber(tokens[0]);
    const itemVnum = parseNumber(tokens[1]);
    const count = parseNumber(tokens[2]);
    const percent = parseNumber(tokens[3]);
    const rarePercent = parseNumber(tokens[4]);

    if (slot === null || itemVnum === null || count === null || percent === null) {
      continue;
    }

    const cleanComment = readableComment(comment);
    const configuredLabel = configuredLabels.get(itemVnum);

    if (!itemLabels[itemVnum]) {
      itemLabels[itemVnum] = configuredLabel || cleanComment || `Item ${itemVnum}`;
    }

    current.entries.push({
      slot,
      itemVnum,
      count,
      percent,
      rarePercent,
      comment: cleanComment,
      sourceLine
    });
  }

  if (current && current.mobVnum > 0) {
    groups.push(current);
  }

  return { groups, itemLabels };
}
