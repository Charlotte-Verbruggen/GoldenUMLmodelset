export interface Model {
    name: string;
    description: string;
    classCount: number;
    associationCount: number;
    // metadata
    language: string
    domain: string[];
    tags: string[];
    source: string;
    // properties
    hasComposition: boolean;
    hasAggregation: boolean;
    hasExtraMaterial: boolean;
    hasAbstract: boolean;
    hasInheritance: boolean;
    hasEnumeration: boolean;
    hasAttributes: boolean;
    hasMethods: boolean;
    hasAssociationClass: boolean;
}
