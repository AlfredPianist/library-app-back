import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shelf } from "./Shelf";

@Entity()
export class Bookcase {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => Shelf, (shelf) => shelf.bookcase)
  shelves?: Shelf[]
}
