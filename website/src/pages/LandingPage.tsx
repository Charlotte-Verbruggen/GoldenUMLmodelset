import { Button } from "@/components/ui/button";
import type { Model } from "@/interfaces/model";
import { Download, Search, Send, FileText } from "lucide-react";
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
        <main className="flex w-full flex-col items-center">
            <section className="mx-auto mt-16 w-full max-w-4xl px-6 text-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                    Golden UML ModelSet
                </h1>
                <p className="mx-auto mb-3 max-w-3xl text-xl leading-relaxed text-slate-700">
                    The <span className="font-semibold">Golden UML ModelSet</span> is a community-curated dataset of cases that consist of UML class diagrams paired with a textual domain description.
                </p>
                <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-slate-600">
                    The dataset fosters a shared resource for the modelling community that supports reproducibility, benchmarking, and pedagogical excellence.
                </p>

                <div className="mx-auto mb-8 w-full max-w-3xl rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
                    <p className="mb-1">
                        Currently there are <span className="font-semibold">{models.length} total cases</span> available.
                    </p>
                    <p className="text-slate-600">
                        This website and the 
                        {' '}<Link to="https://github.com/Charlotte-Verbruggen/GoldenUMLmodelset/tree/main" target="_blank" className="underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500">GitHub repository</Link>
                        {' '}contain the most recent version of the dataset. Copies are also available on
                        {' '}<Link to="https://huggingface.co/datasets/CharlotteVerbruggen/GoldenUMLmodelset" target="_blank" className="underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500">HuggingFace</Link>
                        {' '}and{' '}
                        <Link to="https://zenodo.org/records/16985872" target="_blank" className="underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500">Zenodo</Link>
                        {' '}that are updated at regular intervals.
                    </p>
                </div>

                <p className="mx-auto mb-6 max-w-3xl text-slate-600">
                    Community members interested to contribute can submit new cases via GitHub or the form (linked at the top of the page), or can{' '}
                    <Link to="mailto:charlotte.verbruggen@tuwien.ac.at" className="underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500">send an email</Link>
                    {' '}to indicate their interest to review submitted cases for the dataset.
                </p>

                <div className="mx-auto mb-10 w-full max-w-3xl rounded-lg border border-slate-200 p-4 text-left">
                    <p className="mb-2 text-sm uppercase tracking-wide text-slate-500">Reference</p>
                    <p className="text-sm leading-relaxed text-slate-600">
                        Charlotte Verbruggen, Lukas Netz, Philipp-Lorenz Glaser, Marion Scholz, Christian Huemer, Marco Calamo, Bernhard Rumpe, Monique Snoeck and Dominik Bork (2025). Toward a Community-Curated Golden Dataset of UML Models. In <em>MODELS 2025 Educator Symposium - Int. Conf. on Model Driven Engineering Languages and Systems</em>.{' '}
                        <Link
                            to="https://model-engineering.info/publications/papers/MODELS25-GoldenUMLDataset.pdf"
                            target="_blank"
                            aria-label="Paper PDF"
                            title="Open paper PDF"
                            className="relative inline-flex items-center text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-sm after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1px] after:bg-current after:opacity-0 hover:after:opacity-100"
                        >
                            <FileText size={18} />
                        </Link>
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button asChild className="h-11 gap-2 rounded-full px-5 shadow-sm transition hover:shadow">
                        <a href={`${import.meta.env.BASE_URL}models.zip`} download>
                            <Download size={18} />
                            Download
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="h-11 gap-2 rounded-full px-5 shadow-sm transition hover:shadow">
                        <Link to="/search">
                            <Search size={18} />
                            Search
                        </Link>
                    </Button>
                    <Button asChild className="h-11 gap-2 rounded-full bg-blue-600 px-5 text-white shadow-sm transition hover:bg-blue-700 hover:shadow">
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
