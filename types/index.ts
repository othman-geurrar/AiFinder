export interface AITool {
  id?: number;
  name: string;
  logo?: string;
  description: string;
  category: string;
  url: string;
  relevance?: string;
}

export interface SearchResponse {
  explanation?: string;
  categories?: string[];
  tools?: {
    name: string;
    category: string;
    description: string;
    url: string;
    relevance: string;
  }[];
}
export interface Tool {
  name: string;
  category: string;
  description: string;
  logo: string;
  color: string;
  url: string;
}

export interface AIToolCardProps {
  tool: Tool;
}
