import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) {
    return {};
  }
  return {
    title: `${article.title} | CognitiveInsight.AI`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        <article>
          <div className="mb-8">
            <Link href="/library" className="inline-flex items-center text-primary hover:underline mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Link>
            <h1 className="font-headline text-4xl font-bold tracking-tight">{article.title}</h1>
            <p className="mt-2 text-muted-foreground">
              By {article.author} on {article.date}
            </p>
          </div>
          <div
            className="prose prose-lg dark:prose-invert max-w-none space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </div>
  );
}
