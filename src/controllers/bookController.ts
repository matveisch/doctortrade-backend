import { NextFunction, Request, Response } from 'express';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import bookModel, { BookType } from '../models/bookModel';
import BookModel from '../models/bookModel';

export const get_book = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookName = 'beetrade-book.pdf';
    const bookPath = `https://d1trlqnyyov9mm.cloudfront.net/${bookName}`;

    const url = getSignedUrl({
      url: bookPath,
      dateLessThan: `${new Date(Date.now() + 1000 * 60 * 60 * 24)}`,
      privateKey: process.env.CLOUDFRONT_PRIVATE_KEY || '',
      keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID || '',
    });

    return res.json(url);
  } catch (e) {
    return next(e);
  }
};

export const get_book_info = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id).exec();
    return res.json(book);
  } catch (e) {
    return next(e);
  }
};

export const create_book = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, pathTitle }: BookType = req.body;

  try {
    const newBook = new BookModel({
      title,
      description,
      pathTitle,
    });

    await newBook.save();
    return res.json(newBook);
  } catch (e) {
    return next(e);
  }
};
