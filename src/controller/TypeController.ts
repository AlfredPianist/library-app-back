import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Type } from "../entity/Type";

export class TypeController {
  private typeRepository = AppDataSource.getRepository(Type);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.typeRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const type = await this.typeRepository.findOne({
      where: { id },
    });

    if (!type) {
      return "no medium";
    }
    return type;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { name } = request.body;

    const type = Object.assign(new Type(), { name });

    return this.typeRepository.save(type);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let typeToRemove = await this.typeRepository.findOneBy({ id });

    if (!typeToRemove) {
      return "this type doesn't exist";
    }

    await this.typeRepository.remove(typeToRemove);

    return "type has been removed";
  }
}
