export interface Paper {
  title: string;
  authors: string[];
  summary: string;
  link: string;
  publishedDate: string;
}

const AUTHOR_QUERY = "au:Maxence Leguery";
const ARXIV_URL = `https://export.arxiv.org/api/query?search_query=${encodeURIComponent(
  AUTHOR_QUERY,
)}&start=0&max_results=10`;

function extractAll(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "g");
  const out: string[] = [];
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1]);
  return out;
}

function extractOne(xml: string, tag: string): string {
  return extractAll(xml, tag)[0] ?? "";
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseEntries(xml: string): Paper[] {
  const entries = extractAll(xml, "entry");
  const papers: Paper[] = [];

  for (const entry of entries) {
    const authorBlocks = extractAll(entry, "author");
    const authors = authorBlocks
      .map((b) => decodeEntities(extractOne(b, "name").trim()))
      .filter(Boolean);

    const isAuthored = authors.some(
      (a) => a.includes("Maxence Leguéry") || a.includes("Maxence Leguery"),
    );
    if (!isAuthored) continue;

    const title = decodeEntities(extractOne(entry, "title"))
      .replace(/\s+/g, " ")
      .trim();
    const summary = decodeEntities(extractOne(entry, "summary"))
      .replace(/\s+/g, " ")
      .trim();
    const link = extractOne(entry, "id").trim();
    const published = extractOne(entry, "published").trim();
    const publishedDate = published
      ? new Date(published).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    papers.push({ title, authors, summary, link, publishedDate });
  }
  return papers;
}

async function fetchPapers(): Promise<Paper[]> {
  try {
    const res = await fetch(ARXIV_URL);
    if (!res.ok) throw new Error(`ArXiv ${res.status}`);
    return parseEntries(await res.text());
  } catch (err) {
    console.warn("[Papers] ArXiv fetch failed, falling back to empty list:", err);
    return [];
  }
}

export default async function Papers() {
  const papers = await fetchPapers();

  return (
    <section id="papers" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Scientific Papers
        </h2>

        {papers.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {papers.map((paper, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  <a
                    href={paper.link}
                    target="_blank"
                    className="hover:underline"
                    rel="noopener noreferrer"
                  >
                    {paper.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Authors:</strong> {paper.authors.join(", ")}
                </p>
                <p className="text-gray-500 mb-4">
                  <strong>Published:</strong> {paper.publishedDate}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {paper.summary.length > 300
                    ? `${paper.summary.substring(0, 300)}...`
                    : paper.summary}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white">
            <p className="text-lg mb-4">
              No papers found on ArXiv at the moment.
            </p>
            <p className="text-gray-400">
              Papers will appear here automatically when published on ArXiv.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
