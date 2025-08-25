import { ModelCard } from "@/components/ModelCard";
import { Input } from "@/components/ui/input";
import { MultiSelectCombobox } from "@/components/MultiSelectCombobox";
import type { Model } from "@/interfaces/model";
import { useEffect, useMemo, useState } from "react";
import { PROPERTY_BADGES } from "@/interfaces/properties";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

type SortKey =
  | "name"
  | "language"
  | "source"
  | "classCount"
  | "associationCount";
type SortDir = "asc" | "desc";

const ACCESSORS: Record<SortKey, (m: Model) => string | number> = {
  name: (m) => m.name ?? "",
  language: (m) => m.language ?? "",
  source: (m) => m.source ?? "",
  classCount: (m) => m.classCount ?? 0,
  associationCount: (m) => m.associationCount ?? 0,
};

export default function SearchPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [query, setQuery] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  // Sorting
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}models.json`)
      .then((res) => res.json())
      .then((data: Model[]) => setModels(data))
      .finally(() => setLoading(false));
  }, []);

  // Filter option lists
  const allProperties = PROPERTY_BADGES.map((b) => b.key);
  const allLanguages = useMemo(
    () => Array.from(new Set(models.map((m) => m.language).filter(Boolean))).sort(),
    [models]
  );
  const allDomains = useMemo(
    () => Array.from(new Set(models.flatMap((m) => m.domain || []))).sort(),
    [models]
  );
  const allTags = useMemo(
    () => Array.from(new Set(models.flatMap((m) => m.tags || []))).sort(),
    [models]
  );
  const allSources = useMemo(
    () => Array.from(new Set(models.map((m) => m.source).filter(Boolean))).sort(),
    [models]
  );

  // Filtering
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return models.filter((m) => {
      if (q && !(m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q))) return false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (selectedProperties.length && !selectedProperties.some((p) => (m as any)[p])) return false;
      if (selectedLanguages.length && !selectedLanguages.includes(m.language)) return false;
      if (selectedDomains.length && !(m.domain || []).some((d) => selectedDomains.includes(d))) return false;
      if (selectedTags.length && !(m.tags || []).some((t) => selectedTags.includes(t))) return false;
      if (selectedSources.length && !selectedSources.includes(m.source)) return false;
      return true;
    });
  }, [models, query, selectedProperties, selectedLanguages, selectedDomains, selectedTags, selectedSources]);

  // Sorting
  const sorted = useMemo(() => {
  const get = ACCESSORS[sortKey];
  const data = [...filtered];
  data.sort((a, b) => {
    const va = get(a);
    const vb = get(b);
    let cmp =
      typeof va === "number" && typeof vb === "number"
        ? va - vb
        : String(va).toLowerCase().localeCompare(String(vb).toLowerCase(), undefined, { sensitivity: "base" });
    if (cmp === 0) cmp = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    return sortDir === "asc" ? cmp : -cmp;
  });
  return data;
}, [filtered, sortKey, sortDir]);

  // UI for sorting
  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => {
    const active = sortKey === k;
    const Icon = !active ? ArrowUpDown : sortDir === "asc" ? ArrowUp : ArrowDown;
    const onClick = () => (active ? setSortDir((d) => (d === "asc" ? "desc" : "asc")) : (setSortKey(k), setSortDir("asc")));
    return (
      <Button
        type="button"
        variant={active ? "default" : "outline"}
        size="sm"
        className="rounded-2xl px-3 gap-1"
        onClick={onClick}
        aria-pressed={active}
        title={`Sort by ${label}${active ? ` (${sortDir})` : ""}`}
      >
        <span className="text-sm">{label}</span>
        <Icon className="h-4 w-4" aria-hidden />
      </Button>
    );
  };

  return (
    <main className="mx-auto py-10 px-2 max-w-6xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Search UML Models</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-4 w-full">
        <MultiSelectCombobox label="Property" propertyBadges={PROPERTY_BADGES} options={allProperties} selected={selectedProperties} setSelected={setSelectedProperties} placeholder="All" />
        <MultiSelectCombobox label="Language" options={allLanguages} selected={selectedLanguages} setSelected={setSelectedLanguages} placeholder="All" />
        <MultiSelectCombobox label="Domain" options={allDomains} selected={selectedDomains} setSelected={setSelectedDomains} placeholder="All" />
        <MultiSelectCombobox label="Tag" options={allTags} selected={selectedTags} setSelected={setSelectedTags} placeholder="All" />
        <MultiSelectCombobox label="Source" options={allSources} selected={selectedSources} setSelected={setSelectedSources} placeholder="All" />
      </div>

      {/* Search + Sort */}
      <div className="mb-6 flex flex-col gap-3">
        <div>
          <label className="block text-xs mb-1 text-gray-500 p-1 text-left" htmlFor="model-search">Search</label>
          <Input id="model-search" type="text" placeholder="Search by name or description..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full placeholder:text-gray-400" />
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs text-gray-500 px-1">Sort</span>
          <div className="flex gap-2 overflow-x-auto py-1">
            <SortBtn k="name" label="Name" />
            <SortBtn k="language" label="Language" />
            <SortBtn k="source" label="Source" />
            <SortBtn k="classCount" label="Classes" />
            <SortBtn k="associationCount" label="Associations" />
          </div>
        </div>
      </div>

      {!loading && sorted.length >= 1 && (
        <div className="mb-2 text-gray-500">
          {sorted.length === 1 ? "1 Model found." : `${sorted.length} Models found.`}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {sorted.map((model) => (
            <li key={model.name}>
              <ModelCard model={model} />
            </li>
          ))}
          {!sorted.length && <p className="text-red-500">No models found.</p>}
        </ul>
      )}
    </main>
  );
}
