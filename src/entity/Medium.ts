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

  @Column({ nullable: true })
  synopsis: string;

  @Column({ nullable: true })
  image_path: string;

  @ManyToOne(() => Type, (type) => type.media)
  @JoinColumn({ name: "type_id" })
  type: Type;

  @ManyToOne(() => Shelf, (shelf) => shelf.media)
  @JoinColumn({ name: "shelf_id" })
  shelf: Shelf;

  @ManyToOne(() => Collection, (collection) => collection.media)
  @JoinColumn({ name: "collection_id" })
  collection: Collection;

  @OneToMany(() => Medium, (medium) => medium.physicalMedium)
  @JoinColumn()
  digitalMedia: Medium[];

  @ManyToOne(() => Medium, (medium) => medium.digitalMedia)
  @JoinColumn({ name: "physical_medium_id" })
  physicalMedium: Medium;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
