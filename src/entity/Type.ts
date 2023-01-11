import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Medium } from "./Medium";

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @OneToMany(() => Medium, (medium) => medium.type)
  media?: Medium[]
}
