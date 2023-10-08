import express, { Request, Response } from 'express';
import { robotValidation } from '../../../validation';
import { processRequestQuery } from 'zod-express-middleware';
import { demo } from '../../../controllers';
import {
  BadRequestResponse,
  InternalErrorResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '../../../helpers/response';
const router = express.Router();

router.post(
  '/robot',
  processRequestQuery(robotValidation.ask.body),
  async (req: Request, res: Response) => {
    // Ensure that req.query is defined and contains the 'message' property
    if (req.body && req.body.question) {
      const data = await demo(req.body.question);

    //   if (!data) return InternalErrorResponse(res);

      //   return res.status(200).send(`<p>${data}</p>`);
      return SuccessResponse(res, { reply: data });
    } else {
      // Handle the case where 'message' is missing in req.query
      return BadRequestResponse(res, 'Message is missing in the query parameters.');
    }
  },
);

export default router;
