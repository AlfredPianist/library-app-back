import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Collection } from "./Collection";
import { Shelf } from "./Shelf";
import { Type } from "./Type";

@Entity()
export class Medium {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  classification: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @ManyToOne(() => Type, (type) => type.media)
  @JoinColumn({ name: "type_id" })
  type: Type;

  @ManyToOne(() => Shelf, (shelf) => shelf.media)
  @JoinColumn({ name: "shelf_id" })
  shelf: Shelf;

  @ManyToOne(() => Collection, (collection) => collection.media)
  @JoinColumn({ name: "collection_id" })
  collection: Collection;
}
