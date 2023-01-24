import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
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

export async function seedShelfTable(
  dataSource: DataSource,
  totalSeeds: number
) {
  const bookcaseRepository = dataSource.getRepository(Bookcase);
  const collectionRepository = dataSource.getRepository(Collection);
  const shelfRepository = dataSource.getRepository(Shelf);

  const bookcaseCount = await bookcaseRepository.count();
  const collectionCount = await collectionRepository.count();
  for (let count = 0; count < totalSeeds; count++) {
    const newShelf = createRandomShelf(bookcaseCount, collectionCount);
    shelfRepository.save(newShelf);
  }

  console.log(`Seeded ${totalSeeds} shelves.`);
}
