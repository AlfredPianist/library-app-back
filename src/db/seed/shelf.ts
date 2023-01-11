import { faker } from "@faker-js/faker";
import { AppDataSource } from "../../config/data-source";
import { Bookcase } from "../../entity/Bookcase";
import { Collection } from "../../entity/Collection";
import { Shelf } from "../../entity/Shelf";

function createRandomShelf(
  bookcaseCount: number,
  collectionCount: number
): Collection {
  return Object.assign(new Collection(), {
    position: faker.lorem.word(),
    bookcase: faker.datatype.number({
      min: 1,
      max: bookcaseCount,
    }),
    collection: faker.datatype.number({
      min: 1,
      max: collectionCount,
    }),
  });
}

export async function seedShelfTable(totalSeeds: number) {
  const bookcaseRepository = AppDataSource.getRepository(Bookcase);
  const collectionRepository = AppDataSource.getRepository(Collection);
  const shelfRepository = AppDataSource.getRepository(Shelf);

  const bookcaseCount = await bookcaseRepository.count();
  const collectionCount = await collectionRepository.count();
  for (let count = 0; count < totalSeeds; count++) {
    const newShelf = createRandomShelf(bookcaseCount, collectionCount);
    shelfRepository.save(newShelf);
  }

  console.log(`Seeded ${totalSeeds} shelves.`);
}
