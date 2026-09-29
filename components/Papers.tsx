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
    <>
      {papers.map((paper) => (
        <div className="entry" key={paper.link}>
          <div className="when">{paper.publishedDate}</div>
          <div>
            <h4>
              <a className="paper-link" href={paper.link}>
                {paper.title}
              </a>
            </h4>
            <p className="where">{paper.authors.join(", ")}</p>
            <p className="desc">{paper.summary.length > 300 ? `${paper.summary.substring(0, 300)}…` : paper.summary}</p>
          </div>
        </div>
      ))}
    </>
  );
}
