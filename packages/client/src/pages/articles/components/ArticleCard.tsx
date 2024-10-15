import { Link } from "react-router-dom";
import { Txt } from "@/contexts/texts.context";
import { formatDate } from "@/shared/utils";
import type { ArticleData } from "@@types/User";

export default function ArticleCard({ article }: { article?: ArticleData }) {
  if (!article) {
    // show a 404 page
    return null;
  }

  return (
    article && (
      <article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md text-black h-80 p-6">
        <div>
          <div className="flex flex-col justify-center text-sm text-muted-foreground mb-4">
            <Txt txtKey={article.author.name} className="font-bold" />
            <Txt txtKey={formatDate(article.createdAt)} />
          </div>
          <h3 className="text-xl font-bold mb-4">{article.title}</h3>
          <Txt
            txtKey={article.content}
            className="text-muted-foreground line-clamp-4 !mb-4"
          />
          <Link
            to={`/articles/${article.id}`}
            className="text-primary-foreground"
          >
            <Txt txtKey="shared.readMore" />
          </Link>
        </div>
      </article>
    )
  );
}
