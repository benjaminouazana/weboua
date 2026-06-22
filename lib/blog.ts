import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { site } from './site';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  cover?: string;
  readingMinutes: number;
  draft: boolean;
};

export type Post = PostMeta & { content: string };

function ensureDir(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
}

function parseFile(file: string): Post {
  const slug = file.replace(/\.mdx?$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    author: data.author ?? site.name,
    category: data.category ?? 'Stratégie digitale',
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: data.cover,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    draft: Boolean(data.draft),
    content,
  };
}

/** All published posts, newest first. Drafts excluded in production. */
export function getAllPosts(): Post[] {
  const showDrafts = process.env.NODE_ENV !== 'production';
  return ensureDir()
    .map(parseFile)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | null {
  const file = ensureDir().find((f) => f.replace(/\.mdx?$/, '') === slug);
  return file ? parseFile(file) : null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.category)));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
}
