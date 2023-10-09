import { z } from 'zod';

class RobotValidation {
  // Validation schema for updating an existing robot
  ask = {
    params: z.object({
      question: z.string(),
    }),
    body: z.object({
      question: z.string(),
    }),
  };

  // Validation schema for training a robot
  train = {
    params: z.object({
      robotName: z.string(),
    }),
    body: z.object({
      question: z.string().min(3),
      answer: z.string().min(3),
    }),
  };
}

export const robotValidation = new RobotValidation();
