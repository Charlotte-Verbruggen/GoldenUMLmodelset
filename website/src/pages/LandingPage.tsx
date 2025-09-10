import { Button } from "@/components/ui/button";
import type { Model } from "@/interfaces/model";
import { Download, Search, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const [models, setModels] = useState<Model[]>([]);
    
    useEffect(() => {
        const baseUrl = import.meta.env.BASE_URL;
        fetch(`${baseUrl}models.json`)
            .then((res) => res.json())
            .then((data) => setModels(data))
    }, []);

    return (
        <main className="flex flex-col items-center">
            <section className="flex flex-col items-center w-full mt-16 px-4">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Golden UML ModelSet
                </h1>
                <p className="text-base text-gray-700 mb-2 text-center">
                    The <span className="font-bold">Golden UML ModelSet</span> is a community-curated dataset of cases that consist of UML class diagrams paired with a textual domain description.
                </p>
                <p className="text-base text-gray-700 mb-2 text-center">
                    The dataset fosters a shared resource for the modelling community that supports reproducibility, benchmarking, and pedagogical excellence.
                </p>
                <p className="text-base text-gray-700 mb-6 text-center">
                    Currently there are <span className="font-bold">{models.length} total cases</span> available. This website and the GitHub repository contain the most recent version of the dataset. Additionally, copies of the dataset are provided on <Link to="https://huggingface.co/datasets/CharlotteVerbruggen/GoldenUMLmodelset" target="_blank">HuggingFace</Link> and <Link to="https://zenodo.org/records/16985872" target="_blank">Zenodo</Link> that are updated at regular intervals.
                </p>
                <p className="text-base text-gray-700 mb-6 text-center">
                    Community members that are interested to contribute can submit new cases via GitHub or the form (linked at the top of the page), or can <Link to="mailto:charlotte.verbruggen@tuwien.ac.at">send an email</Link> to indicate their interest to review submitted cases for the dataset.
                </p>
                <p className="text-base text-gray-700 mb-6 text-center">
                    More information about the construction of the dataset can be found in the accompanying paper:
                </p>
                <p className="text-base text-gray-700 mb-6 text-center">
                    Charlotte Verbruggen, Lukas Netz, Philipp-Lorenz Glaser, Marion Scholz, Christian Huemer, Marco Calamo, Bernhard Rumpe, Monique Snoeck and Dominik Bork (2025). Toward a Community-Curated Golden Dataset of UML Models. In <em>MODELS 2025 Educator Symposium - Int. Conf. on Model Driven Engineering Languages and Systems</em>. <Link to="https://model-engineering.info/publications/papers/MODELS25-GoldenUMLDataset.pdf" target="_blank">link</Link>
                </p>
                <div className="flex flex-row">
                    <Button asChild className="mr-2">
                        <a href={`${import.meta.env.BASE_URL}models.zip`} download>
                            <Download size={18} />
                            Download
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="mr-2">
                        <Link to="/search">
                            <Search size={18} />
                            Search
                        </Link>
                    </Button>
                    <Button asChild className="bg-blue-600">
                        <a href="https://forms.gle/Y4QmXKC5DueQE9u99" target="_blank" rel="noopener noreferrer">
                            <Send size={18} />
                            Submit
                        </a>
                    </Button>
                </div>
            </section>
        </main>
    );
}
