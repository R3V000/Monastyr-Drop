"use client";

import { useMemo, useState } from "react";
import type { DropGroup } from "@/lib/mob-drop-parser";
import {
  buildItemOptions,
  buildSourceOptions,
  computeComparisonRows,
  computeSourceDropRows,
  formatCompact,
  type DashboardSettings,
  type DropSimulationConfig
} from "@/lib/drop-calculator";

type DropDashboardProps = {
  groups: DropGroup[];
  itemLabels: Record<number, string>;
  config: DropSimulationConfig;
  summary: {
    groupCount: number;
    mobCount: number;
    entryCount: number;
    itemCount: number;
  };
};

const typeFilters = [
  { value: "all", label: "Wszystkie" },
  { value: "drop", label: "Drop" },
  { value: "limit", label: "Limit" },
  { value: "kill", label: "Kill" }
] as const;

function getSelectedVnums(key: string, config: DropSimulationConfig) {
  if (key.startsWith("category:")) {
    const category = config.categories.find((item) => item.id === key.replace("category:", ""));
    return category?.itemVnums || [];
  }

  const vnum = Number(key.replace("item:", ""));
  return Number.isFinite(vnum) ? [vnum] : [];
}

function selectedLabel(key: string, config: DropSimulationConfig, itemLabels: Record<number, string>) {
  if (key.startsWith("category:")) {
    return config.categories.find((item) => item.id === key.replace("category:", ""))?.label || "Kategoria";
  }

  const vnum = Number(key.replace("item:", ""));
  return itemLabels[vnum] || `Item ${vnum}`;
}

export default function DropDashboard({ groups, itemLabels, config, summary }: DropDashboardProps) {
  const defaultCategory = config.categories[0]?.id ? `category:${config.categories[0].id}` : "item:25040";
  const [activeView, setActiveView] = useState<"items" | "sources">("items");
  const [selectedKey, setSelectedKey] = useState(defaultCategory);
  const [query, setQuery] = useState("");
  const [sourceQuery, setSourceQuery] = useState("");
  const [selectedSourceKey, setSelectedSourceKey] = useState("");
  const [settings, setSettings] = useState<DashboardSettings>({
    typeFilter: "all",
    onlyConfigured: false
  });

  const itemOptions = useMemo(() => buildItemOptions(groups, itemLabels), [groups, itemLabels]);
  const sourceOptions = useMemo(() => buildSourceOptions(groups, config), [config, groups]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return itemOptions.slice(0, 220);
    }

    return itemOptions
      .filter((item) => `${item.label} ${item.vnum}`.toLowerCase().includes(normalized))
      .slice(0, 220);
  }, [itemOptions, query]);

  const filteredSources = useMemo(() => {
    const normalized = sourceQuery.trim().toLowerCase();
    if (!normalized) {
      return sourceOptions.slice(0, 260);
    }

    return sourceOptions
      .filter((source) => `${source.label} ${source.mobVnum} ${source.typeSet.join(" ")}`.toLowerCase().includes(normalized))
      .slice(0, 260);
  }, [sourceOptions, sourceQuery]);

  const selectedVnums = useMemo(() => getSelectedVnums(selectedKey, config), [config, selectedKey]);
  const rows = useMemo(
    () => computeComparisonRows(groups, selectedVnums, config, settings),
    [config, groups, selectedVnums, settings]
  );

  const selectedSource =
    filteredSources.find((source) => source.key === selectedSourceKey) || filteredSources[0];
  const sourceRows = useMemo(
    () =>
      selectedSource
        ? computeSourceDropRows(groups, selectedSource.mobVnum, itemLabels, config)
        : [],
    [config, groups, itemLabels, selectedSource]
  );

  const visibleRows = rows;
  const chartRows = rows;
  const maxDaily = Math.max(...chartRows.map((row) => row.expectedDaily), 0);
  const totalDaily = rows.reduce((sum, row) => sum + row.expectedDaily, 0);
  const totalKills = rows.reduce((sum, row) => sum + row.dailyKills, 0);
  const bestRow = rows[0];
  const label = selectedLabel(selectedKey, config, itemLabels);
  const sourceTotalDaily = sourceRows.reduce((sum, row) => sum + row.expectedDaily, 0);

  const updateSetting = <K extends keyof DashboardSettings>(key: K, value: DashboardSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Monastyr Drop</p>
          <h1>Porównanie dziennego dropu</h1>
        </div>
        <div className="summary-strip" aria-label="Podsumowanie pliku">
          <span>{formatCompact(summary.groupCount, 0)} grup</span>
          <span>{formatCompact(summary.mobCount, 0)} mobów</span>
          <span>{formatCompact(summary.itemCount, 0)} itemów</span>
          <span>{formatCompact(summary.entryCount, 0)} wpisów</span>
        </div>
      </header>

      <nav className="view-tabs" aria-label="Widok">
        <button
          type="button"
          className={activeView === "items" ? "active" : ""}
          onClick={() => setActiveView("items")}
        >
          Porównanie itemu
        </button>
        <button
          type="button"
          className={activeView === "sources" ? "active" : ""}
          onClick={() => setActiveView("sources")}
        >
          Drop z moba
        </button>
      </nav>

      {activeView === "items" ? (
        <>
          <section className="control-grid" aria-label="Ustawienia porównania">
            <div className="panel selector-panel">
              <label htmlFor="item-query">Item lub VNUM</label>
              <div className="select-row">
                <input
                  id="item-query"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="np. 25040 albo Zwój"
                />
                <select value={selectedKey} onChange={(event) => setSelectedKey(event.target.value)}>
                  <optgroup label="Kategorie">
                    {config.categories.map((category) => (
                      <option key={category.id} value={`category:${category.id}`}>
                        {category.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="VNUM">
                    {filteredItems.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.label} · {item.vnum}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="panel compact-panel">
              <label>Typ grupy</label>
              <div className="segmented">
                {typeFilters.map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    className={settings.typeFilter === filter.value ? "active" : ""}
                    onClick={() => updateSetting("typeFilter", filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="panel toggle-panel">
              <input
                type="checkbox"
                checked={settings.onlyConfigured}
                onChange={(event) => updateSetting("onlyConfigured", event.target.checked)}
              />
              <span>Tylko moby z configu</span>
            </label>
          </section>

          <section className="metric-grid" aria-label="Wynik dzienny">
            <div className="metric">
              <span>Wybrany drop</span>
              <strong>{label}</strong>
              <small>{selectedVnums.map((vnum) => `VNUM ${vnum}`).join(", ")}</small>
            </div>
            <div className="metric accent-teal">
              <span>Sztuk dziennie</span>
              <strong>{formatCompact(totalDaily, 2)}</strong>
              <small>{formatCompact(totalKills, 0)} zabić / dobę</small>
            </div>
            <div className="metric accent-amber">
              <span>Najmocniejszy mob</span>
              <strong>{bestRow ? bestRow.mobName : "Brak"}</strong>
              <small>{bestRow ? `${formatCompact(bestRow.expectedDaily, 2)} szt./dzień` : "0 szt./dzień"}</small>
            </div>
            <div className="metric accent-red">
              <span>Źródła</span>
              <strong>{formatCompact(rows.length, 0)}</strong>
              <small>mobów z wybranym itemem</small>
            </div>
          </section>

          <section className="workspace">
            <div className="panel chart-panel">
              <div className="section-heading">
                <h2>Wykres dzienny</h2>
                <span>{formatCompact(chartRows.length, 0)} pozycji</span>
              </div>
              <div className="bar-chart">
                {chartRows.length === 0 ? (
                  <div className="empty-state">Brak wpisów dla aktualnego filtra</div>
                ) : (
                  chartRows.map((row, index) => {
                    const width = maxDaily > 0 ? Math.max(2, (row.expectedDaily / maxDaily) * 100) : 0;
                    return (
                      <div className="bar-row" key={row.mobVnum}>
                        <div className="bar-label">
                          <span>{index + 1}</span>
                          <strong>{row.mobName}</strong>
                          <em>{row.mobVnum}</em>
                        </div>
                        <div className="bar-track" aria-label={`${row.mobName}: ${formatCompact(row.expectedDaily, 2)}`}>
                          <div className="bar-fill" style={{ width: `${width}%` }} />
                        </div>
                        <div className="bar-value">{formatCompact(row.expectedDaily, 2)}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="panel table-panel">
              <div className="section-heading">
                <h2>Porównanie mobów</h2>
                <span>{formatCompact(rows.length, 0)} wyników</span>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Mob</th>
                      <th>Typ</th>
                      <th>Model</th>
                      <th>Wpisy</th>
                      <th>Skala</th>
                      <th>Zabić / dzień</th>
                      <th>Szt. / kill</th>
                      <th>Szt. / dzień</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row) => (
                      <tr key={row.mobVnum}>
                        <td>
                          <strong>{row.mobName}</strong>
                          <span>VNUM {row.mobVnum}</span>
                        </td>
                        <td>
                          <span className={`type-badge type-${row.typeSet[0]}`}>{row.typeSet.join(", ")}</span>
                        </td>
                        <td>
                          <span className="type-badge">{row.calculationMode === "dungeon" ? "Dungeon" : "Mapa"}</span>
                        </td>
                        <td>{row.matchingEntries}</td>
                        <td>
                          {row.calculationMode === "dungeon"
                            ? `${formatCompact(row.dungeonRunsPerDay, 1)} runów`
                            : `${formatCompact(row.channels, 2)} ch`}
                        </td>
                        <td>{formatCompact(row.dailyKills, 1)}</td>
                        <td>{formatCompact(row.expectedPerKill, 4)}</td>
                        <td className="daily-cell">{formatCompact(row.expectedDaily, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="control-grid source-control-grid" aria-label="Wybór moba">
            <div className="panel selector-panel">
              <label htmlFor="source-query">Mob, dungeon lub VNUM</label>
              <div className="select-row">
                <input
                  id="source-query"
                  value={sourceQuery}
                  onChange={(event) => setSourceQuery(event.target.value)}
                  placeholder="np. Jeon, Ripper albo 8027"
                />
                <select
                  value={selectedSource?.key || ""}
                  onChange={(event) => setSelectedSourceKey(event.target.value)}
                >
                  {filteredSources.map((source) => (
                    <option key={source.key} value={source.key}>
                      {source.label} · {source.mobVnum}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="metric-grid" aria-label="Drop z moba">
            <div className="metric">
              <span>Wybrane źródło</span>
              <strong>{selectedSource?.label || "Brak"}</strong>
              <small>{selectedSource ? `VNUM ${selectedSource.mobVnum}` : "VNUM -"}</small>
            </div>
            <div className="metric accent-teal">
              <span>Suma sztuk dziennie</span>
              <strong>{formatCompact(sourceTotalDaily, 2)}</strong>
              <small>{formatCompact(selectedSource?.dailyKills || 0, 0)} zabić / dobę</small>
            </div>
            <div className="metric accent-amber">
              <span>Itemy w dropie</span>
              <strong>{formatCompact(sourceRows.length, 0)}</strong>
              <small>{formatCompact(selectedSource?.groupCount || 0, 0)} grup</small>
            </div>
            <div className="metric accent-red">
              <span>Model</span>
              <strong>{selectedSource?.calculationMode === "dungeon" ? "Dungeon" : "Mapa"}</strong>
              <small>{selectedSource?.typeSet.join(", ") || "-"}</small>
            </div>
          </section>

          <section className="single-workspace">
            <div className="panel table-panel">
              <div className="section-heading">
                <h2>Dzienny drop źródła</h2>
                <span>{formatCompact(sourceRows.length, 0)} itemów</span>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Typ</th>
                      <th>Wpisy</th>
                      <th>Punkty</th>
                      <th>Szt. / kill</th>
                      <th>Szt. / dzień</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sourceRows.map((row) => (
                      <tr key={row.itemVnum}>
                        <td>
                          <strong>{row.itemName}</strong>
                          <span>VNUM {row.itemVnum}</span>
                        </td>
                        <td>
                          <span className={`type-badge type-${row.typeSet[0]}`}>{row.typeSet.join(", ")}</span>
                        </td>
                        <td>{row.matchingEntries}</td>
                        <td>{formatCompact(row.configuredPoints, 2)}</td>
                        <td>{formatCompact(row.expectedPerKill, 4)}</td>
                        <td className="daily-cell">{formatCompact(row.expectedDaily, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
