import { ModelCard } from "@/components/ModelCard";
import { Input } from "@/components/ui/input";
import { MultiSelectCombobox } from "@/components/MultiSelectCombobox";
import type { Model } from "@/interfaces/model";
import { useEffect, useState } from "react";
import { PROPERTY_BADGES } from "@/interfaces/properties";



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


    useEffect(() => {
        let baseUrl = import.meta.env.BASE_URL;
        //if (!baseUrl.endsWith("uml-dataset-website/")) {
        //    baseUrl += "uml-dataset-website/";
        //}
        fetch(`${baseUrl}models.json`)
            .then((res) => res.json())
            .then((data) => {
                setModels(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const allProperties = PROPERTY_BADGES.map((b) => b.key);
    const allLanguages = Array.from(new Set(models.map(m => m.language).filter(Boolean)));
    const allDomains = Array.from(new Set(models.flatMap(m => m.domain || [])));
    const allTags = Array.from(new Set(models.flatMap(m => m.tags || [])));
    const allSources = Array.from(new Set(models.map(m => m.source).filter(Boolean)));

    const filteredModels = models.filter((model) => {
        const q = query.toLowerCase();
        if (!(
            model.name?.toLowerCase().includes(q) ||
            model.description?.toLowerCase().includes(q)
        )) { return false; }
        
        // properties
        if (selectedProperties.length > 0 && !selectedProperties.some((prop) => (model as any)[prop])) return false;
        // language
        if (selectedLanguages.length > 0 && !selectedLanguages.includes(model.language)) return false;
        // domain
        if (selectedDomains.length > 0 && !(model.domain || []).some(d => selectedDomains.includes(d))) return false;
        // tags
        if (selectedTags.length > 0 && !(model.tags || []).some(t => selectedTags.includes(t))) return false;
        // source
        if (selectedSources.length > 0 && !selectedSources.includes(model.source)) return false;

        return true
    });


    return (
        <main className="mx-auto py-10 px-2 max-w-6xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Search UML Models</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
                {/* Property Filter */}
                <MultiSelectCombobox
                    label="Property"
                    propertyBadges={PROPERTY_BADGES}
                    options={allProperties}
                    selected={selectedProperties}
                    setSelected={setSelectedProperties}
                    placeholder="All"
                />
                {/* Language Filter */}
                <MultiSelectCombobox
                    label="Language"
                    options={allLanguages}
                    selected={selectedLanguages}
                    setSelected={setSelectedLanguages}
                    placeholder="All"
                />
                {/* Domain Filter */}
                <MultiSelectCombobox
                    label="Domain"
                    options={allDomains}
                    selected={selectedDomains}
                    setSelected={setSelectedDomains}
                    placeholder="All"
                />
                {/* Tag Filter */}
                <MultiSelectCombobox
                    label="Tag"
                    options={allTags}
                    selected={selectedTags}
                    setSelected={setSelectedTags}
                    placeholder="All"
                />
                {/* Source Filter */}
                <MultiSelectCombobox
                    label="Source"
                    options={allSources}
                    selected={selectedSources}
                    setSelected={setSelectedSources}
                    placeholder="All"
                />
            </div>

            <div className="mb-8">
                <label className="block text-xs mb-1 text-gray-500 p-1 text-left" htmlFor="model-search">Search</label>
                <Input
                    id="model-search"
                    type="text"
                    placeholder="Search by name or description..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full placeholder:text-gray-400"
                />
            </div>

            {(!loading && filteredModels.length >= 1) && (
                <div className="mb-2 text-gray-500">
                {filteredModels.length === 1
                    ? "1 Model found."
                    : `${filteredModels.length} Models found.`}
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="space-y-4">
                    {filteredModels.map((model) => (
                        <li key={model.name}>
                            <ModelCard model={model} />
                        </li>
                    ))}
                    {!filteredModels.length && <p className="text-red-500">No models found.</p>}
                </ul>
            )}
        </main>
    );
}