import { Txt } from "@/contexts/texts.context";
import { fetchArticle } from "@/shared/apis/interceptors";
import { formatDate } from "@/shared/utils";
import type { ArticleData } from "@@types/User";
import { Link, useLoaderData } from "react-router-dom";

export const articleLoader = async ({ params }: any) => {
  try {
    const response = await fetchArticle(params.id);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default function Article() {
  const articleData = useLoaderData() as ArticleData;

  if (!articleData) {
    // show a 404 page
    return null;
  }

  return (
    articleData && (
      <article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md text-black h-80 p-6">
        <div>
          <div className="flex flex-col justify-center text-sm text-muted-foreground mb-4">
            <Txt txtKey={articleData.author.name} className="font-bold" />
            <Txt txtKey={formatDate(articleData.createdAt)} />
          </div>
          <h3 className="text-xl font-bold mb-4">{articleData.title}</h3>
          <Txt
            txtKey={articleData.content}
            className="text-muted-foreground line-clamp-4 !mb-4"
          />
          <Link
            to={`/articles/${articleData.id}`}
            className="text-primary-foreground"
          >
            <Txt txtKey="shared.readMore" />
          </Link>
        </div>
      </article>
    )
  );
}
