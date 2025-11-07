export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'case-study' | 'thought-leadership' | 'guide';
  date: string;
  readTime: string;
  content: ArticleContent[];
  tags: string[];
  featured?: boolean;
}

export interface ArticleContent {
  type: 'heading' | 'paragraph' | 'list' | 'highlight' | 'stats';
  content: string | string[] | Record<string, string>;
  level?: number; // for headings
}
