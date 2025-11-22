import { Request, Response } from "express";
import { ContatoService } from "./contato.service";
import { contatoParamsSchema } from "./contact.schemas";

export class ContatoController {
  static async listar(req: Request, res: Response) {
    const contatos = await ContatoService.listar();
    return res.json(contatos);
  }

  static async buscar(req: Request, res: Response) {
    const { id } = contatoParamsSchema.parse(req.params);

    const contato = await ContatoService.buscarPorId(id);
    if (!contato) {
      return res.status(404).json({ error: "Contato não encontrado" });
    }

    return res.json(contato);
  }

  static async criar(req: Request, res: Response) {
    const contato = await ContatoService.criar(req.body);
    return res.status(201).json(contato);
  }

  static async editar(req: Request, res: Response) {
    const { id } = contatoParamsSchema.parse(req.params);

    const contato = await ContatoService.editar(id, req.body);
    return res.json(contato);
  }

  static async excluir(req: Request, res: Response) {
    const { id } = contatoParamsSchema.parse(req.params);

    await ContatoService.excluir(id);
    return res.status(204).send();
  }
}
