import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Bookcase } from "./Bookcase";
import { Collection } from "./Collection";
import { Medium } from "./Medium";

@Entity()
export class Shelf {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  position: string;

  @ManyToOne(() => Bookcase, (bookcase) => bookcase.shelves)
  @JoinColumn({ name: "bookcase_id" })
  bookcase: Bookcase;

  @OneToMany(() => Medium, (medium) => medium.shelf)
  media?: Medium[];

  @ManyToOne(() => Collection, (collection) => collection.shelves)
  @JoinColumn({ name: "collection_id" })
  collection: Collection;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
