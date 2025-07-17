import type { Model } from "@/interfaces/model";
import { Link } from "react-router-dom";
import { PROPERTY_BADGES } from "@/interfaces/properties";
import { ArrowLeftRight, Box } from "lucide-react";
import { Separator } from "@/components/ui/separator";


export function ModelCard({ model }: Readonly<{ model: Model }>) {
    return (
        <Link to={`/model/${encodeURIComponent(model.name)}`}>
            <div className="p-4 bg-white rounded-lg shadow border flex flex-col gap-2 hover:bg-gray-50 transition">
            <div className="font-bold text-xl text-left mb-1">{model.name}</div>
            <Separator />
            <div className="flex flex-wrap gap-3 items-center mb-2">
                    <span className="flex items-center gap-1 font-semibold text-sm text-gray-700">
                        <Box className="w-4 h-4 text-blue-500" strokeWidth={2.2} />
                        <span className="font-bold">{model.classCount}</span> Classes
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-sm text-gray-700">
                        <ArrowLeftRight className="w-4 h-4 text-emerald-500" strokeWidth={2.2} />
                        <span className="font-bold">{model.associationCount}</span> Associations
                    </span>
                {/* Render property badges */}
                {PROPERTY_BADGES.map(
                ({ key, label, color }) =>
                    model[key] && (
                    <span
                        key={key}
                        className={`text-xs px-2 py-0.5 rounded ${color}`}
                        title={label}
                    >
                        {label}
                    </span>
                    )
                )}
            </div>
            <div className="flex gap-2 text-xs text-gray-500 flex-wrap">
                {model.language && (
                    <span className="bg-gray-100 rounded px-2 py-0.5">{model.language}</span>
                )}
                {model.domain &&
                    Array.isArray(model.domain) &&
                    model.domain.map((d) => (
                        <span key={d} className="bg-yellow-50 rounded px-2 py-0.5 text-yellow-800">
                        {d}
                        </span>
                ))}
                {model.tags &&
                    Array.isArray(model.tags) &&
                    model.tags.map((tag) => (
                        <span key={tag} className="bg-gray-200 rounded px-2 py-0.5">{tag}</span>
                ))}
            </div>
            {model.source && (
                <div className="text-xs text-left text-gray-400 mt-1">
                    <span className="font-medium">Source: </span>
                    {model.source}
                </div>
            )}
            <Separator />
            {model.description && (
                <p className="text-gray-600 text-left text-xs line-clamp-2">{model.description}</p>
            )}
            </div>
        </Link>
    );
}