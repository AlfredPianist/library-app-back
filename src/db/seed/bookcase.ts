import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Bookcase } from "../../entity/Bookcase";

function createRandomBookcase(): Bookcase {
  const bookcase = Object.assign(new Bookcase(), {
    name: faker.lorem.word(),
    location: faker.address.county(),
  });
  return bookcase;
}

export async function seedBookcaseTable(
  dataSource: DataSource,
  totalSeeds: number
) {
  const bookcaseRepository = dataSource.getRepository(Bookcase);
  for (let count = 0; count < totalSeeds; count++) {
    const newBookcase = createRandomBookcase();
    await bookcaseRepository.save(newBookcase);
  }

  console.log(`Seeded ${totalSeeds} bookcases.`);
}
