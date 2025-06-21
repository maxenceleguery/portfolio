import { useState, useEffect } from 'react';
import { Paper } from '../Papers';

export function useArxivPapers() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArxivPapers = async () => {
      try {
        const query = 'au:Maxence Leguery';
        const url = `https://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=10`;
        
        const response = await fetch(url);
        const xmlText = await response.text();
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        const entries = xmlDoc.getElementsByTagName('entry');
        const paperList: Paper[] = [];
        
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          const title = entry.getElementsByTagName('title')[0]?.textContent || '';
          const summary = entry.getElementsByTagName('summary')[0]?.textContent || '';
          const authors = entry.getElementsByTagName('author');
          const authorsList: string[] = [];
          
          for (let index = 0; index < authors.length; index++) {
            const authorName = authors[index].getElementsByTagName('name')[0]?.textContent?.trim();
            if (authorName) {
              authorsList.push(authorName);
            }
          }
          
          // Only include papers where Maxence Leguéry is an author
          if (authorsList.some(author => author.includes('Maxence Leguéry') || author.includes('Maxence Leguery'))) {
            const link = entry.getElementsByTagName('id')[0]?.textContent || '';
            const publishedDate = entry.getElementsByTagName('published')[0]?.textContent || '';
            
            paperList.push({
              title: title.replace(/\s+/g, ' ').trim(),
              authors: authorsList,
              summary: summary.replace(/\s+/g, ' ').trim(),
              link: link,
              publishedDate: new Date(publishedDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })
            });
          }
        }
        
        setPapers(paperList);
      } catch (error) {
        console.error("Error fetching papers:", error);
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArxivPapers();
  }, []);

  return { papers, loading };
}