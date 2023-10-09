import express, { Request, Response } from 'express';
import { robotValidation } from '../../../validation';
import { processRequestBody } from 'zod-express-middleware';
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
  processRequestBody(robotValidation.ask.body),
  async (req: Request, res: Response) => {
    // Ensure that req.body is defined and contains the 'text' property
    if (req.body && req.body.question) {
      const data = await demo(req.body.question);

      // Set a timeout of 2 seconds (2000 milliseconds)
      setTimeout(function () {
        // console.log('This code will run after 2 seconds.');
        if (!data) return InternalErrorResponse(res);

        return SuccessResponse(res, { reply: data });
      }, 2000);
    } else {
      // Handle the case where 'text' is missing in req.body
      return BadRequestResponse(res, 'Text is missing in the body parameters.');
    }
  },
);

export default router;
