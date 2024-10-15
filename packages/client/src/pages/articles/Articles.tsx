import { useLoaderData, useNavigate } from "react-router-dom";
import ArticleCard from "./components/ArticleCard";
import { fetchArticles } from "@/shared/apis/interceptors";
import type { ArticleData } from "@@types/User";

export const articlesLoader = async () => {
  try {
    const response = await fetchArticles();
    return response;
  } catch (error) {
    console.error(error);
  }
};

const Articles = () => {
  const articlesData = useLoaderData() as ArticleData[];
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articlesData.map((article: ArticleData) => (
          <button
            onClick={() => navigate(`/articles/${article.id}`)}
            key={article.id}
            className="text-left"
          >
            <ArticleCard article={article} />
          </button>
        ))}
      </div>
      {/* <Outlet /> */}
    </div>
  );
};

export default Articles;
