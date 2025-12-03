import { Request, Response } from "express";
import { ContactService } from "./contact.service";
import { contactCreateSchema, contactUpdateSchema } from "./contact.schemas";
import { contactParamsSchema } from "./contact.schemas";

export class ContactController {

  static async getAll(req: Request, res: Response) {
    const userId = req.user.id;
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);

    const data = await ContactService.getPaginated(userId, page, limit);

    return res.json(data);
  }

  static async getById(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { id } = contactParamsSchema.parse(req.params);

    const contact = await ContactService.findById(userId, id);
    return res.json(contact);
  }

  static async create(req: Request, res: Response) {
    const { id: userId } = req.user;
    const payload = contactCreateSchema.parse(req.body);

    const result = await ContactService.create(userId, payload);
    return res.status(201).json(result);
  }

  static async update(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { id } = contactParamsSchema.parse(req.params);
    const payload = contactUpdateSchema.parse(req.body);

    const result = await ContactService.updateById(userId, id, payload);
    return res.json(result);
  }

  static async delete(req: Request, res: Response) {
    const { id: userId } = req.user;
    const { id } = contactParamsSchema.parse(req.params);

    await ContactService.deleteById(userId, id);
    return res.status(204).send();
  }

  static async search(req: Request, res: Response) {
    const { id: userId } = req.user;
    const term = req.query.search as string || "";

    const results = await ContactService.search(userId, term);
    return res.json(results);
  }
}
