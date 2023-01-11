import { faker } from "@faker-js/faker";
import { AppDataSource } from "../../config/data-source";
import { Bookcase } from "../../entity/Bookcase";

function createRandomBookcase(): Bookcase {
  const bookcase = Object.assign(new Bookcase(), {
    name: faker.lorem.word(),
    location: faker.address.county(),
  });
  return bookcase;
}

export async function seedBookcaseTable(totalSeeds: number) {
  const bookcaseRepository = AppDataSource.getRepository(Bookcase);
  for (let count = 0; count < totalSeeds; count++) {
    const newBookcase = createRandomBookcase();
    await bookcaseRepository.save(newBookcase);
  }

  console.log(`Seeded ${totalSeeds} bookcases.`);
}
