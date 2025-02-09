// Temporary mock implementation since we removed exa-js
export interface ExaSearchResult {
  title: string;
  url: string;
  text: string;
  score: number;
}

export async function searchAndContents(query: string): Promise<ExaSearchResult[]> {
  // Return mock data for demonstration
  return [
    {
      title: "AI in Modern Software Development",
      url: "https://example.com/ai-development",
      text: "Artificial intelligence is revolutionizing how we develop software, enabling more efficient and intelligent solutions.",
      score: 0.95
    },
    {
      title: "The Future of AI Tools",
      url: "https://example.com/ai-tools",
      text: "Next-generation AI tools are changing how developers work, providing intelligent assistance and automation.",
      score: 0.88
    }
  ];
}