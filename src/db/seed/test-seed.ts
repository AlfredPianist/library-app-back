import { AppDataSource } from "../../config/test-data-source";
import { seedBookcaseTable } from "./bookcase";
import { seedCollectionTable } from "./collection";
import { seedMediumTable } from "./medium";
import { seedShelfTable } from "./shelf";
import { seedTypeTable } from "./type";

AppDataSource.initialize()
  .then(() => {
    console.log("Seeding database...");

    seedTypeTable(AppDataSource);
    seedCollectionTable(5);
    (async () => {
      await seedBookcaseTable(2);
      await seedShelfTable(10);
      await seedMediumTable(20);
    })();
  })
  .catch((error) => console.log(error));
