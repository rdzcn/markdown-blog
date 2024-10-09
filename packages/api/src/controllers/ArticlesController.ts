import { notFound } from '@hapi/boom';
import type { Request, Response } from 'express';
import articles from '../data/articles.json';

const getArticles = async (req: Request, res: Response) => {
  const authorId = req.body.userData.id;
  const userArticles = articles.filter((article) => article.authorId === authorId);

  if (!userArticles) {
    throw notFound('No Article found');
  }

  res.json(userArticles);
};

export const ArticlesController = {
  getArticles,
};
