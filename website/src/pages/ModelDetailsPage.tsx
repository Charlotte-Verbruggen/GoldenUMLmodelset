import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Model } from "@/interfaces/model";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeftRight, Box, ChevronDown, ChevronUp, Download } from "lucide-react";
import { PROPERTY_BADGES } from "@/interfaces/properties";
import { Separator } from "@/components/ui/separator";

export default function ModelDetails() {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const [model, setModel] = useState<Model | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [descOpen, setDescOpen] = useState<boolean>(false);
    
    useEffect(() => {
        const baseUrl = import.meta.env.BASE_URL;
        fetch(`${baseUrl}models.json`)
            .then((res) => res.json())
            .then((data: Model[]) => {
                const found = data.find(
                    (m) => m.name.toLowerCase() === decodeURIComponent(name ?? "").toLowerCase()
                );
                setModel(found || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [name]);

    if (loading) return <main className="p-8">Loading...</main>;
    if (!model) return (
        <main className="p-8 text-center">
            <p className="mb-6">Model not found.</p>
            <Button variant="outline" onClick={() => navigate(-1)}>
                Back
            </Button>
        </main>
    );
    
    return (
        <main className="w-full flex flex-col items-center py-10 px-2 text-left">
            <div className="w-full max-w-4xl">
                <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>
                <div className="rounded-xl shadow p-8 flex flex-col gap-6 bg-white">
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <h2 className="text-3xl font-bold">{model.name}</h2>
                        <a
                            href={`${import.meta.env.BASE_URL}models/${encodeURIComponent(model.name)}.zip`}
                            download
                        >
                            <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
                                <Download size={16} />
                                Download
                            </Button>
                        </a>
                    </div>
                    <Separator />
                    
                    {/* Elements & Relationships */}
                    <div className="flex flex-wrap gap-4 text-md text-gray-700">
                        <span className="flex items-center gap-1 font-semibold text-sm text-gray-700">
                            <Box className="w-4 h-4 text-blue-500" strokeWidth={2.2} />
                            <span className="font-bold">{model.classCount}</span> Classes
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-sm text-gray-700">
                            <ArrowLeftRight className="w-4 h-4 text-emerald-500" strokeWidth={2.2} />
                            <span className="font-bold">{model.associationCount}</span> Associations
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                    {PROPERTY_BADGES.map(
                        ({ key, label, color }) => model[key] && (
                            <span
                            key={key}
                            className={`px-2 py-0.5 rounded font-medium ${color}`}
                            title={label}
                            >
                            {label}
                            </span>
                        )
                    )}
                    </div>
                    
                    {/* Language, Domain, Tags */}
                    <div className="flex flex-wrap gap-2 text-xs">
                        {model.language && (
                            <span className="bg-gray-100 rounded px-2 py-0.5 text-gray-600">
                                Language: {model.language}
                            </span>
                        )}
                        {model.domain && Array.isArray(model.domain) && model.domain.length > 0 &&
                            model.domain.map((d: string) => (
                                <span key={d} className="bg-yellow-50 rounded px-2 py-0.5 text-yellow-800">
                                    Domain: {d}
                                </span>
                            ))}
                        {model.tags && Array.isArray(model.tags) && model.tags.length > 0 &&
                            model.tags.map((tag: string) => (
                                <span key={tag} className="bg-gray-200 rounded px-2 py-0.5 text-gray-700">
                                    {tag}
                                </span>
                            ))}
                    </div>
                    
                    {/* Source */}
                    {model.source && (
                        <div className="text-xs text-gray-400">
                            <span className="font-medium">Source:</span> {model.source}
                        </div>
                    )}
                    <Separator />
                    {/* Description (collapsible) */}
                    {model.description && (
                        <Collapsible open={descOpen} onOpenChange={setDescOpen}>
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="mb-2 text-left px-0"
                                    aria-expanded={descOpen}
                                >
                                    <span className="font-semibold">
                                        {descOpen ? "Hide Description" : "Show Description"}
                                    </span>
                                    {descOpen ? (
                                        <ChevronUp className="ml-2" size={18} />
                                    ) : (
                                        <ChevronDown className="ml-2" size={18} />
                                    )}
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="text-gray-800 whitespace-pre-line px-2 pb-2">
                                    {model.description}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )}
                    <Separator />
                    {/* UML Diagram */}
                    <div>
                        <div className="font-semibold mb-2">UML Diagram</div>
                        <div className="bg-gray-100 p-2 rounded flex items-center justify-center">
                            <img
                                src={`${import.meta.env.BASE_URL}models/${encodeURIComponent(model.name)}/plantuml.svg`}
                                alt={`PlantUML diagram for ${model.name}`}
                                className="max-w-full rounded shadow"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
