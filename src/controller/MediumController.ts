import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Medium } from "../entity/Medium";

export class MediumController {
  private mediumRepository = AppDataSource.getRepository(Medium);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.mediumRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const medium = await this.mediumRepository.findOne({
      where: { id },
    });

    if (!medium) {
      return "no medium";
    }
    return medium;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { classification, name, author, type, shelf, collection } =
      request.body;

    const medium = Object.assign(new Medium(), {
      classification,
      name,
      author,
      type,
      shelf,
      collection,
    });

    return this.mediumRepository.save(medium);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let mediumToRemove = await this.mediumRepository.findOneBy({ id });

    if (!mediumToRemove) {
      return "this medium doesn't exist";
    }

    await this.mediumRepository.remove(mediumToRemove);

    return "medium has been removed";
  }
}
