import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import { Collection } from "../../entity/Collection";

function createRandomCollection(): Collection {
  return Object.assign(new Collection(), {
    name: faker.lorem.word(),
    publisher: faker.company.name(),
  });
}

export async function seedCollectionTable(
  dataSource: DataSource,
  totalSeeds: number
) {
  const collectionRepository = dataSource.getRepository(Collection);
  for (let count = 0; count < totalSeeds; count++) {
    const newCollection = createRandomCollection();
    await collectionRepository.save(newCollection);
  }

  console.log(`Seeded ${totalSeeds} collections.`);
}
