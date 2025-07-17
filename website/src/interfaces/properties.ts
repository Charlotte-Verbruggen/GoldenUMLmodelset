import type { Model } from "@/interfaces/model";

export interface PropertyBadge {
    key: keyof Model;
    label: string;
    color: string;
}

export const PROPERTY_BADGES: PropertyBadge[] = [
    { key: "hasAbstract", label: "Abstract", color: "bg-pink-50 text-pink-700" },
    { key: "hasAggregation", label: "Aggregation", color: "bg-green-50 text-green-700" },
    { key: "hasAssociationClass", label: "Assoc. Class", color: "bg-yellow-100 text-yellow-700" },
    { key: "hasAttributes", label: "Attributes", color: "bg-teal-50 text-teal-700" },
    { key: "hasComposition", label: "Composition", color: "bg-blue-50 text-blue-700" },
    { key: "hasEnumeration", label: "Enumeration", color: "bg-cyan-50 text-cyan-700" },
    { key: "hasExtraMaterial", label: "Extra Material", color: "bg-gray-500 text-white" },
    { key: "hasInheritance", label: "Inheritance", color: "bg-purple-50 text-purple-700" },
    { key: "hasMethods", label: "Methods", color: "bg-orange-50 text-orange-700" },
];
