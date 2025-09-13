import { useArxivPapers } from "@/components/hooks/useArxivPapers";

export interface Paper {
  title: string;
  authors: string[];
  summary: string;
  link: string;
  publishedDate: string;
}

export default function Papers() {
  const { papers, loading } = useArxivPapers();

  return (
    <section id="papers" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Scientific Papers</h2>
        
        {loading ? (
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading papers from ArXiv...</p>
          </div>
        ) : papers.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {papers.map((paper, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  <a href={paper.link} target="_blank" className="hover:underline" rel="noopener noreferrer">
                    {paper.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Authors:</strong> {paper.authors.join(', ')}
                </p>
                <p className="text-gray-500 mb-4">
                  <strong>Published:</strong> {paper.publishedDate}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {paper.summary.length > 300 
                    ? `${paper.summary.substring(0, 300)}...` 
                    : paper.summary
                  }
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white">
            <p className="text-lg mb-4">No papers found on ArXiv at the moment.</p>
            <p className="text-gray-400">Papers will appear here automatically when published on ArXiv.</p>
          </div>
        )}
      </div>
    </section>
  );
}