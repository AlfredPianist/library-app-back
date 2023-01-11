import { AppDataSource } from "../../config/data-source";
import { Type } from "../../entity/Type";

export function seedTypeTable() {
  const typeRepository = AppDataSource.getRepository(Type);
  const typesArray = [
    "Book",
    "Magazine",
    "Video",
    "Music",
    "Audiobook",
    "Software",
    "Photo",
  ];

  typesArray.forEach(async (type) => {
    const existingType = await typeRepository.findOneBy({ name: type });
    if (!existingType) {
      const newType = Object.assign(new Type(), { name: type });
      typeRepository.save(newType);
    }
  });

  console.log("Seeded 7 types.");
}
