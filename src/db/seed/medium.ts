import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
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

export async function seedMediumTable(
  dataSource: DataSource,
  totalSeeds: number
) {
  const typeRepository = dataSource.getRepository(Type);
  const shelfRepository = dataSource.getRepository(Shelf);
  const collectionRepository = dataSource.getRepository(Collection);
  const mediumRepository = dataSource.getRepository(Medium);

  const typeCount = await typeRepository.count();
  const shelfCount = await shelfRepository.count();
  const collectionCount = await collectionRepository.count();
  for (let count = 0; count < totalSeeds; count++) {
    const newMedium = createRandomMedium(
      typeCount,
      shelfCount,
      collectionCount
    );
    mediumRepository.save(newMedium);
  }

  console.log(`Seeded ${totalSeeds} media.`);
}
