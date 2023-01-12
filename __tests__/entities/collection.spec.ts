import sinon from "sinon";
import { DataSource, Repository } from "typeorm";
import { TestAppDataSource } from "../../src/config/data-source-test";
import { Collection } from "../../src/entity/Collection";

describe("Collection entity", () => {
  let connection: DataSource;
  let collectionRepository: Repository<Collection>;
  let clock: sinon.SinonFakeTimers;

  beforeAll(async () => {
    connection = await TestAppDataSource.initialize();
    collectionRepository = connection.getRepository(Collection);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  beforeEach(async () => {
    clock = sinon.useFakeTimers({
      now: Date.now(),
      toFake: [
        "setTimeout",
        "setInterval",
        "setImmediate",
        "clearTimeout",
        "clearInterval",
        "clearImmediate",
      ],
      shouldAdvanceTime: true,
      shouldClearNativeTimers: true,
    });
    await collectionRepository.query(`TRUNCATE collection CASCADE;`);
  });

  afterEach(async () => {
    clock.restore();
  });

  test("Should save a collection", async () => {
    const collection = new Collection();
    collection.name = "New Collection";
    collection.publisher = "New Publisher";

    await collectionRepository.save(collection);

    const savedCollection = await collectionRepository.findOneBy({
      name: "New Collection",
    });

    expect(savedCollection).toBeDefined();
    expect(savedCollection!.name).toBe("New Collection");
  });

  test("Should update a collection", async () => {
    const collection = new Collection();
    collection.name = "New Collection";
    collection.publisher = "New Publisher";
    await collectionRepository.save(collection);

    const createdAt = collection.created_at;
    clock.tick(100);

    collection.name = "Another new Collection";
    await collectionRepository.save(collection);

    const updatedAt = collection.updated_at;

    expect(createdAt).not.toEqual(updatedAt);
  });

  test("Should delete a collection", async () => {
    const collection = new Collection();

    collection.name = "New Collection";
    collection.publisher = "New Publisher";

    await collectionRepository.save(collection);
    const oldCollectionCount = await collectionRepository.count();

    await collectionRepository.delete({ name: "New Collection" });
    const newCollectionCount = await collectionRepository.count();

    expect(oldCollectionCount).toBeGreaterThan(newCollectionCount);
  });
});
