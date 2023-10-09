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

      // Set a timeout of 2 seconds (2000 milliseconds)
      setTimeout(function () {
        // console.log('This code will run after 2 seconds.');
          if (!data) return InternalErrorResponse(res);
        return SuccessResponse(res, { reply: data });
      }, 2000);


      //   return res.status(200).send(`<p>${data}</p>`);
    } else {
      // Handle the case where 'message' is missing in req.query
      return BadRequestResponse(res, 'Message is missing in the body parameters.');
    }
  },
);

export default router;
