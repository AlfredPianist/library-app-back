import { AppDataSource } from "../../config/data-source";
import { seedBookcaseTable } from "./bookcase";
import { seedCollectionTable } from "./collection";
import { seedMediumTable } from "./medium";
import { seedShelfTable } from "./shelf";
import { seedTypeTable } from "./type";

AppDataSource.initialize()
  .then(() => {
    console.log("Seeding database...");

    (async () => {
      await seedTypeTable(AppDataSource);
      await seedCollectionTable(AppDataSource, 5);
      await seedBookcaseTable(AppDataSource, 2);
      await seedShelfTable(AppDataSource, 10);
      await seedMediumTable(AppDataSource, 20);
    })();
  })
  .catch((error) => console.log(error));
