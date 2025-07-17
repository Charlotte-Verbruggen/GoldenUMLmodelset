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
                    The <span className="font-bold">Golden UML ModelSet</span> is a community-curated dataset of UML modeling exercises for education.
                </p>
                <p className="text-base text-gray-700 mb-6 text-center">
                    Currently there are <span className="font-bold">{models.length} total models</span> available.
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