import { faker } from "@faker-js/faker";
import { DataSource, Repository } from "typeorm";
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
    synopsis: faker.lorem.paragraphs(5),
    image_path: faker.internet.url(),
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

async function addRelatedPhysicalMedium(
  mediumRepository: Repository<Medium>,
  digitalMedium: Medium,
  physicalMediumId: number
) {
  const physicalMedium = await mediumRepository.findOneBy({
    id: physicalMediumId,
  });

  if (physicalMedium) {
    digitalMedium.physicalMedium = physicalMedium;
  }
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

  const physicalMediumSeeds = faker.datatype.number({
    min: 1,
    max: Math.round(totalSeeds / 3),
  });
  const digitalMediumSeeds = totalSeeds - physicalMediumSeeds;

  const mediaIds: Array<number> = [];
  for (let count = 0; count < physicalMediumSeeds; count++) {
    const newPhysicalMedium = createRandomMedium(
      typeCount,
      shelfCount,
      collectionCount
    );
    await mediumRepository.save(newPhysicalMedium);
    mediaIds.push(newPhysicalMedium.id!);
  }

  for (let count = 0; count < digitalMediumSeeds; count++) {
    const newDigitalMedium = createRandomMedium(
      typeCount,
      shelfCount,
      collectionCount
    );
    await addRelatedPhysicalMedium(
      mediumRepository,
      newDigitalMedium,
      faker.helpers.arrayElement<number>(mediaIds)
    );
    await mediumRepository.save(newDigitalMedium);
  }

  console.log(`Seeded ${totalSeeds} media.`);
}
