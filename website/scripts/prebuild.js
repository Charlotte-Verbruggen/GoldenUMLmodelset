import fs from 'node:fs';
import path from "node:path";
import { fileURLToPath } from 'node:url';
import plantUMLParser from 'plantuml-parser';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATASET_DIR = path.resolve(__dirname, '../../dataset');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const MODELS_DIR = path.resolve(__dirname, '../public/models');
const OUTPUT_FILE = path.resolve(__dirname, '../public/models.json');

function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter((file) =>
        fs.statSync(path.join(srcPath, file)).isDirectory()
    );
}

function parsePlantUML(filePath) {
    let lines = fs.readFileSync(filePath, 'utf8').split('\n');
    const plantumlContent = lines.join('\n');
    return plantUMLParser.parse(plantumlContent);
}

function getDescription(filePath) {
    if (!fs.existsSync(filePath)) return '';
    return fs.readFileSync(filePath, 'utf8');
}

function checkUmlConcepts(elements) {
    // concepts to check depending on arrow heads
    const concepts = [
        { property: 'hasComposition', symbols: ['*'] },
        { property: 'hasAggregation', symbols: ['o'] },
        { property: 'hasInheritance', symbols: ['<|', '|>']}
    ];

    // Get elements by type
    const relationships = elements.filter(e => e instanceof plantUMLParser.Relationship);
    const classes = elements.filter(e => e instanceof plantUMLParser.Class);
    const classNames = new Set(classes.map(c => c.name));
    const enums = elements.filter(e => e instanceof plantUMLParser.Enum);

    // Prepare result object
    const result = {};
    for (const concept of concepts) {
        result[concept.property] = relationships.some(rel =>
            concept.symbols.includes(rel.leftArrowHead) ||
            concept.symbols.includes(rel.rightArrowHead)
        );
    }

    result.hasAbstract = classes.some(c => c.isAbstract === true);
    result.hasEnumeration = enums.length > 0;
    result.hasAttributes = classes.some(c =>
        Array.isArray(c.members) &&
        c.members.some(member => member instanceof plantUMLParser.MemberVariable)
    );
    result.hasMethods = classes.some(c =>
        Array.isArray(c.members) &&
        c.members.some(member => member instanceof plantUMLParser.Method)
    );
    result.hasAssociationClass = relationships.some(rel => {
        const isDotted =
            rel.leftArrowBody === '.' &&
            rel.rightArrowBody === '.' &&
            rel.leftArrowHead === '' &&
            rel.rightArrowHead === '';
        if (!isDotted) return false;

        const leftNames = typeof rel.left === 'string' ? rel.left.split(',').map(s => s.trim()).filter(Boolean) : [];
        const rightNames = typeof rel.right === 'string' ? rel.right.split(',').map(s => s.trim()).filter(Boolean) : [];
        // At least one side refers to multiple classes AND all names exist as classes
        return (
            (allClassNames(classNames, rel.left) && allClassNames(classNames, rel.right)) && (leftNames.length > 1 || rightNames.length > 1)
        );
    });
    return result;
}

// Utility to check if all names are classes
function allClassNames(classNames, str) {
    if (typeof str !== 'string') return false;
    const names = str.split(',').map(s => s.trim()).filter(Boolean);
    // at least one name, and all names must be in classNames
    return names.length > 0 && names.every(name => classNames.has(name));
}

function getModelData(folderPath, folderName) {
    const plantumlPath = path.join(folderPath, 'plantuml.txt');
    const descriptionPath = path.join(folderPath, 'description.md');
    const metadataPath = path.join(folderPath, 'metadata.txt');
    const extraMaterialPath = path.join(folderPath, 'extramaterial');

    if (!fs.existsSync(plantumlPath)) return null;

    const parsed = parsePlantUML(plantumlPath);
    const elements = parsed.at(0).elements;

    const classCount = elements.filter(e => e instanceof plantUMLParser.Class).length
    const associationCount = elements.filter(e => e instanceof plantUMLParser.Relationship).length
    const metadata = parseMetadata(metadataPath);
    const umlConcepts = checkUmlConcepts(elements);
    const hasExtraMaterial = fs.existsSync(extraMaterialPath) && fs.statSync(extraMaterialPath).isDirectory();

    return {
        name: folderName,
        description: getDescription(descriptionPath),
        classCount,
        associationCount,
        hasExtraMaterial,
        ...umlConcepts,
        ...metadata
    };
}

function parseMetadata(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const raw = fs.readFileSync(filePath, 'utf8');
    const lines = raw.split('\n');
    const metadata = {};
    for (let line of lines) {
        line = line.trim();
        if (!line || !line.includes(':')) continue;
        const [key, ...rest] = line.split(':');
        if (key.trim() === 'name') continue; // Skip name as it's already the folder name
        let value = rest.join(':').trim();
        // tags and domain are expected to be comma-separated lists
        if (['tags', 'domain'].includes(key)) {
            value = value ? value.split(',').map(s => s.trim()).filter(Boolean) : [];
        }
        metadata[key] = value;
    }
    return metadata;
}

// Recursively copy all files and folders from src to dest
function copyRecursiveSync(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
        const srcPath = path.join(src, entry);
        const destPath = path.join(dest, entry);
        if (fs.statSync(srcPath).isDirectory()) {
            copyRecursiveSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Copies all files of each model into public/models/[modelName]
function copyAllModelFiles(modelFolders) {
    for (const folder of modelFolders) {
        const src = path.join(DATASET_DIR, folder);
        const dest = path.join(MODELS_DIR, folder);
        copyRecursiveSync(src, dest);
    }
}

function zipModelFiles() {
    fs.readdirSync(MODELS_DIR).forEach(modelName => {
        const modelPath = path.join(MODELS_DIR, modelName);
        if (fs.statSync(modelPath).isDirectory()) {
          const zip = new AdmZip();
          zip.addLocalFolder(modelPath);
          zip.writeZip(path.join(MODELS_DIR, `${modelName}.zip`));
        }
    });
}

function zipAllModels() {
    const zip = new AdmZip();
    // Add each model folder and its contents to the root of the ZIP
    fs.readdirSync(MODELS_DIR).forEach(modelName => {
        const modelPath = path.join(MODELS_DIR, modelName);
        if (fs.statSync(modelPath).isDirectory()) {
            // The second argument ensures correct folder structure inside ZIP
            zip.addLocalFolder(modelPath, modelName);
        }
    });
    zip.writeZip(path.join(PUBLIC_DIR, 'models.zip'));
    console.log(`Created ZIP of all models as ${path.join(MODELS_DIR, 'models.zip')}`);
}

// TODO: Add validation?
function main() {
    if (!fs.existsSync(MODELS_DIR)) fs.mkdirSync(MODELS_DIR, { recursive: true });
    const modelFolders = getDirectories(DATASET_DIR);
    const models = [];

    for (const folder of modelFolders) {
        const folderPath = path.join(DATASET_DIR, folder);
        const data = getModelData(folderPath, folder);
        if (data) models.push(data);
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(models, null, 2));
    console.log(`Wrote ${models.length} models to ${OUTPUT_FILE}`);

    copyAllModelFiles(modelFolders);
    console.log(`Copied all model files to ${MODELS_DIR}`);

    zipModelFiles();
    console.log(`Zipped model files in ${MODELS_DIR}`);

    zipAllModels();
}

main()