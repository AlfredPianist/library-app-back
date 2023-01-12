import { DataSource } from "typeorm";
import { Type } from "../../entity/Type";

export async function seedTypeTable(dataSource: DataSource) {
  const typeRepository = dataSource.getRepository(Type);
  const typesArray = [
    "Book",
    "Magazine",
    "Video",
    "Music",
    "Audiobook",
    "Software",
    "Photo",
  ];

  await Promise.all(
    typesArray.map(async (type) => {
      const existingType = await typeRepository.findOneBy({ name: type });
      if (!existingType) {
        const newType = Object.assign(new Type(), { name: type });
        return typeRepository.save(newType);
      }
      return Promise.resolve();
    })
  );

  console.log("Seeded 7 types.");
}
