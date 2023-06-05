import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@bssbssticket/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    //Can add validator for checking valid orderid
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send({ order });
  }
);

export { router as showOrderRouter };
