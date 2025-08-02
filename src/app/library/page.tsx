import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { articles } from '@/lib/articles';
import { ArrowRight } from 'lucide-react';

export default function LibraryPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Thought Library</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Insights on AI governance, compliance, and the future of verifiable trust.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-1 lg:grid-cols-2">
        {articles.map((article) => (
          <Link href={`/library/${article.slug}`} key={article.slug} className="block group">
            <Card className="flex flex-col h-full transition-all group-hover:shadow-xl group-hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{article.title}</CardTitle>
                <CardDescription>{article.date} by {article.author}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{article.excerpt}</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center font-semibold text-primary">
                  Read article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
