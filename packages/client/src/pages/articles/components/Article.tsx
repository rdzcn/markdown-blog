import type { ArticleData } from "../../../data/article-data";

interface ArticleProps {
	article: ArticleData;
}

export default function Article({ article }: ArticleProps) {
	return (
		<article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md">
			<div className="p-6">
				<div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
					<div>{article.author}</div>
					<div className="flex items-center space-x-1">
						<div className="h-4 w-4" />
						<span>{article.date}</span>
					</div>
				</div>
				<h3 className="mb-4 text-xl font-bold">{article.title}</h3>
				<p className="text-muted-foreground">{article.content}</p>
			</div>
		</article>
	);
}
