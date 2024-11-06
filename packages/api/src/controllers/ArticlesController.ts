import { notFound } from '@hapi/boom';
import type { Request, Response } from 'express';
import articles from '../data/articles.json';
import users from '../data/users.json';

const getArticles = async (req: Request, res: Response) => {
  const authorId = req.body.userData.id;
  const userArticles = articles.filter((article) => article.authorId === authorId);

  const articlesWithAuthor = userArticles.map((article) => {
    const author = users.find((user) => user.id === article.authorId);
    return { ...article, author: { name: author?.name, email: author?.email, avatar: author?.profileImage} };
  })

  if (!userArticles) {
    throw notFound('No Article found');
  }

  res.json(articlesWithAuthor);
};

const getArticle = async (req: Request, res: Response) => {
  const authorId = req.body.userData.id;
  const articleId = req.params.id;

  const userArticles = articles.filter((article) => article.authorId === authorId);
  const articlesWithAuthor = userArticles.map((article) => {
    const author = users.find((user) => user.id === article.authorId);
    return { ...article, author: { name: author?.name, email: author?.email, avatar: author?.profileImage} };
  })

  const article = articlesWithAuthor.find((article) => article.id === articleId);

  if (!article) {
    throw notFound('Article not found');
  }
  res.json(article);
}

export const ArticlesController = {
  getArticles,
  getArticle
};
