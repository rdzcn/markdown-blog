import { Txt } from "@/contexts/texts.context";
import { formatDate } from "@/shared/utils";
import type { ArticleData } from "@@types/User";
import { Link } from "react-router-dom";

interface ArticleProps {
  article: ArticleData;
}

export default function Article({ article }: ArticleProps) {
  return (
    <article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md text-black h-80 p-6">
      <div className="">
        <div className="mb-4 flex flex-col justify-center text-sm text-muted-foreground">
          <Txt txtKey={article.author.name} className="font-bold" />
          <Txt txtKey={formatDate(article.createdAt)} />
        </div>
        <h3 className="mb-4 text-xl font-bold">{article.title}</h3>
        <Txt
          txtKey={article.content}
          className="text-muted-foreground line-clamp-4"
        />
        <Link
          to={`/articles/${article.id}`}
          className="mt-4 text-primary-foreground"
        >
          <Txt txtKey="shared.readMore" />
        </Link>
      </div>
    </article>
  );
}
