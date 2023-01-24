import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Medium } from "./Medium";
import { Shelf } from "./Shelf";

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  publisher: string;

  @OneToMany(() => Medium, (medium) => medium.collection)
  media?: Medium[];

  @OneToMany(() => Shelf, (shelf) => shelf.collection)
  shelves?: Shelf[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
