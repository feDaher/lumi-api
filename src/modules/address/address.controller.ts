import { Request, Response } from "express";
import { createAddressSchema } from "./address.schema";
import { AddressService } from "./address.service";

export class AddressController {

  static async getMe(req: Request, res: Response) {
    const userId = req.user.id;
    const data = await AddressService.getPrimary(userId);
    return res.json(data);
  }

  static async list(req: Request, res: Response) {
    const userId = req.user.id;
    const list = await AddressService.list(userId);
    return res.json(list);
  }

  static async create(req: Request, res: Response) {
    const userId = req.user.id;

    const payload = createAddressSchema.parse(req.body);
    const address = await AddressService.create(userId, payload);

    return res.status(201).json(address);
  }

  static async update(req: Request, res: Response) {
    const userId = req.user.id;
    const { id } = req.params;

    const address = await AddressService.update(id, userId, req.body);
    return res.json(address);
  }
}
