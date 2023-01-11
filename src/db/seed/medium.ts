import { faker } from "@faker-js/faker";
import { AppDataSource } from "../../config/data-source";
import { Collection } from "../../entity/Collection";
import { Medium } from "../../entity/Medium";
import { Shelf } from "../../entity/Shelf";
import { Type } from "../../entity/Type";

function createRandomMedium(
  typeCount: number,
  shelfCount: number,
  collectionCount: number
): Medium {
  return Object.assign(new Medium(), {
    classification: faker.lorem.word(),
    name: faker.commerce.productName(),
    author: faker.name.fullName(),
    type: faker.datatype.number({
      min: 1,
      max: typeCount,
    }),
    shelf: faker.datatype.number({
      min: 1,
      max: shelfCount,
    }),
    collection: faker.datatype.number({
      min: 1,
      max: collectionCount,
    }),
  });
}

export async function seedMediumTable(totalSeeds: number) {
  const typeRepository = AppDataSource.getRepository(Type);
  const shelfRepository = AppDataSource.getRepository(Shelf);
  const collectionRepository = AppDataSource.getRepository(Collection);
  const mediumRepository = AppDataSource.getRepository(Medium);

  const typeCount = await typeRepository.count();
  const shelfCount = await shelfRepository.count();
  const collectionCount = await collectionRepository.count();
  for (let count = 0; count < totalSeeds; count++) {
    const newMedium = createRandomMedium(typeCount, shelfCount, collectionCount);
    mediumRepository.save(newMedium);
  }

  console.log(`Seeded ${totalSeeds} media.`);
}
