import sinon from "sinon";
import { DataSource, Repository } from "typeorm";
import { TestAppDataSource } from "../../src/config/data-source-test";
import { Bookcase } from "../../src/entity/Bookcase";

describe("Bookcase entity", () => {
  let connection: DataSource;
  let bookcaseRepository: Repository<Bookcase>;
  let clock: sinon.SinonFakeTimers;

  beforeAll(async () => {
    connection = await TestAppDataSource.initialize();
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
      ],
      shouldAdvanceTime: true,
      shouldClearNativeTimers: true,
    });
    await bookcaseRepository.query(`TRUNCATE bookcase CASCADE;`);
  });

  afterEach(async () => {
    clock.restore();
  });

  test("Should save a bookcase", async () => {
    const bookcase = new Bookcase();
    bookcase.name = "New Bookcase";
    bookcase.location = "New Location";

    await bookcaseRepository.save(bookcase);

    const savedBookcase = await bookcaseRepository.findOneBy({
      name: "New Bookcase",
    });

    expect(savedBookcase).toBeDefined();
    expect(savedBookcase!.name).toBe("New Bookcase");
  });

  test("Should update a bookcase", async () => {
    const bookcase = new Bookcase();
    bookcase.name = "New Bookcase";
    bookcase.location = "New Location";
    await bookcaseRepository.save(bookcase);

    const createdAt = bookcase.created_at;
    clock.tick(100);

    bookcase.name = "Another new Bookcase";
    await bookcaseRepository.save(bookcase);

    const updatedAt = bookcase.updated_at;

    expect(createdAt).not.toEqual(updatedAt);
  });

  test("Should delete a bookcase", async () => {
    const bookcase = new Bookcase();

    bookcase.name = "New Bookcase";
    bookcase.location = "New Location";

    await bookcaseRepository.save(bookcase);
    const oldBookcaseCount = await bookcaseRepository.count();

    await bookcaseRepository.delete({ name: "New Bookcase" });
    const newBookcaseCount = await bookcaseRepository.count();

    expect(oldBookcaseCount).toBeGreaterThan(newBookcaseCount);
  });
});
