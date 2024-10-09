import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import ArticlesData, { type ArticleData } from "../../data/article-data";
import Article from "./components/Article";
import { fetchArticles } from "@/shared/apis/interceptors";

export const articlesLoader = async () => {
	try {
		const response = await fetchArticles();
		return response;
	} catch (error) {
		console.error(error);
	}
}

const Articles = () => {
	const { pathname } = useLocation();
	const data = useLoaderData();
	console.log('ARTICLES DATA', data);
	return (
		<div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{!pathname.includes('/articles/edit') ? 
					ArticlesData.map((article: ArticleData, index: number) => (
						<Link to={`/articles/edit/${index}`} key={article.title}>
							<Article article={article} />
						</Link>
					)) : null}
			</div>
			<Outlet />
		</div>
	);
};

export default Articles;
