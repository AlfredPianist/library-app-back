import { faker } from "@faker-js/faker";
import { AppDataSource } from "../../config/data-source";
import { Collection } from "../../entity/Collection";

function createRandomCollection(): Collection {
  return Object.assign(new Collection(), {
    name: faker.lorem.word(),
    publisher: faker.company.name(),
  });
}

export function seedCollectionTable(totalSeeds: number) {
  const collectionRepository = AppDataSource.getRepository(Collection);
  for (let count = 0; count < totalSeeds; count++) {
    const newCollection = createRandomCollection();
    collectionRepository.save(newCollection);
  }

  console.log(`Seeded ${totalSeeds} collections.`);
}
