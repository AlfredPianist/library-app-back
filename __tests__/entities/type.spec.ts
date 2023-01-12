import { TestAppDataSource } from "../../src/config/data-source-test";
import { DataSource, Repository } from "typeorm";
import { seedTypeTable } from "../../src/db/seed/type";
import { Type } from "../../src/entity/Type";

describe("Type entity", () => {
  let connection: DataSource;
  let typeRepository: Repository<Type>;

  beforeAll(async () => {
    connection = await TestAppDataSource.initialize();
    typeRepository = connection.getRepository(Type);
  });

  afterAll(async () => {
    connection.destroy();
  });

  afterEach(async () => {
    await typeRepository.query(`TRUNCATE type CASCADE;`);
  });

  test("Should save a type", async () => {
    const type = new Type();
    type.name = "New Type";

    await typeRepository.save(type);
    const savedType = await typeRepository.findOneBy({ name: "New Type" });

    expect(savedType).toBeDefined();
    expect(savedType!.name).toEqual("New Type");
  });

  test("Should have 7 types after seeding", async () => {
    await seedTypeTable(TestAppDataSource);

    const typeCount = await typeRepository.count();
    expect(typeCount).toEqual(7);
  });
});
