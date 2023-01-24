import sinon from "sinon";
import { DataSource, Repository } from "typeorm";
import { TestAppDataSource } from "../../src/config/data-source-test";
import { seedBookcaseTable } from "../../src/db/seed/bookcase";
import { seedCollectionTable } from "../../src/db/seed/collection";
import { Bookcase } from "../../src/entity/Bookcase";
import { Collection } from "../../src/entity/Collection";
import { Shelf } from "../../src/entity/Shelf";

describe("Shelf entity", () => {
  let connection: DataSource;
  let shelfRepository: Repository<Shelf>;
  let collectionRepository: Repository<Collection>;
  let bookcaseRepository: Repository<Bookcase>;
  let clock: sinon.SinonFakeTimers;

  beforeAll(async () => {
    connection = await TestAppDataSource.initialize();
    shelfRepository = connection.getRepository(Shelf);
    collectionRepository = connection.getRepository(Collection);
    bookcaseRepository = connection.getRepository(Bookcase);
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
        'Date'
      ],
      shouldAdvanceTime: true,
      shouldClearNativeTimers: true,
    });
    await shelfRepository.query(`DELETE FROM shelf CASCADE;`);
    await bookcaseRepository.query(`DELETE FROM bookcase CASCADE;`);
    await collectionRepository.query(`DELETE FROM collection CASCADE;`);
    await seedBookcaseTable(TestAppDataSource, 2);
    await seedCollectionTable(TestAppDataSource, 3);
  });

  afterEach(async () => {
    clock.restore();
  });

  test("Should save a shelf", async () => {
    let collection = await collectionRepository
      .createQueryBuilder()
      .select("id")
      .orderBy("random()")
      .getRawOne<Collection | null>();
    let bookcase = await bookcaseRepository
      .createQueryBuilder()
      .select("id")
      .orderBy("random()")
      .getRawOne<Bookcase | null>();
    collection = await collectionRepository.findOneBy({ id: collection!.id });
    bookcase = await bookcaseRepository.findOneBy({ id: bookcase!.id });

    const shelf = new Shelf();
    shelf.position = "New Position";
    shelf.bookcase = bookcase!;
    shelf.collection = collection!;

    await shelfRepository.save(shelf);

    const savedShelf = await shelfRepository.findOne({
      where: {
        position: "New Position",
      },
      relations: ["bookcase", "collection"],
    });

    expect(savedShelf).toBeDefined();
    expect(savedShelf!.position).toBe("New Position");
    expect(savedShelf!.bookcase).toStrictEqual(bookcase);
    expect(savedShelf!.collection).toStrictEqual(collection);

    const updatedBookcase = await bookcaseRepository.findOne({
      where: { id: bookcase!.id },
      relations: ["shelves"],
    });
    expect(savedShelf!).toMatchObject(updatedBookcase!.shelves![0]);

    const updatedCollection = await collectionRepository.findOne({
      where: { id: collection!.id },
      relations: ["shelves"],
    });
    expect(savedShelf!).toMatchObject(updatedCollection!.shelves![0]);
  });

  test("Should update a shelf", async () => {
    let collection = await collectionRepository
      .createQueryBuilder()
      .select("id")
      .orderBy("random()")
      .getRawOne<Collection | null>();
    let bookcase = await bookcaseRepository
      .createQueryBuilder()
      .select("id")
      .orderBy("random()")
      .getRawOne<Bookcase | null>();
    collection = await collectionRepository.findOneBy({ id: collection!.id });
    bookcase = await bookcaseRepository.findOneBy({ id: bookcase!.id });

    const shelf = new Shelf();
    shelf.position = "New Position";
    shelf.bookcase = bookcase!;
    shelf.collection = collection!;

    await shelfRepository.save(shelf);

    const createdAt = shelf.created_at;
    clock.tick(100);

    shelf.position = "Another New Position";
    await shelfRepository.save(shelf);

    const updatedAt = shelf.updated_at;

    console.log(createdAt);
    console.log(updatedAt);

    expect(createdAt).not.toEqual(updatedAt);
  });

  test("Should delete a shelf", async () => {
    const collection = await collectionRepository
      .createQueryBuilder()
      .select("*")
      .orderBy("random()")
      .getRawOne<Collection>();
    const bookcase = await bookcaseRepository
      .createQueryBuilder()
      .select("*")
      .orderBy("random()")
      .getRawOne<Bookcase>();

    const shelf = new Shelf();
    shelf.position = "New Position";
    shelf.bookcase = bookcase!;
    shelf.collection = collection!;

    await shelfRepository.save(shelf);
    const oldShelfCount = await shelfRepository.count();

    await shelfRepository.delete({ position: "New Position" });
    const newShelfCount = await shelfRepository.count();

    expect(oldShelfCount).toBeGreaterThan(newShelfCount);
  });
});
