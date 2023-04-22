import { NextFunction, Request, Response } from 'express';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

export const get_book = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const video = await Video.findById(req.params.videoid);
    const bookName = 'beetrade-book.pdf';
    const bookPath = `https://d1trlqnyyov9mm.cloudfront.net/${bookName}`;

    const url = getSignedUrl({
      url: bookPath,
      dateLessThan: `${new Date(Date.now() + 1000 * 60 * 60 * 24)}`,
      privateKey: process.env.CLOUDFRONT_PRIVATE_KEY || '',
      keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID || '',
    });

    res.json(url);
  } catch (e) {
    return next(e);
  }
};
