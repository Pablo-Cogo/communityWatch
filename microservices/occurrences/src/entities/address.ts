import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Occurrence } from './occurrence';

export enum OccurrenceStatus {
  Aberto = 0,
  Processando = 1,
  Fechado = 2,
}

@Entity('address')
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  private _id!: string;

  get id(): string {
    return this._id;
  }

  set id(_: string) {}

  @Column()
  @IsNotEmpty()
  occurrenceLatitude!: string;

  @Column()
  @IsNotEmpty()
  occurrenceLongitude!: string;

  @OneToMany(() => Occurrence, (occurrence) => occurrence.address)
  occurrences!: Occurrence[];
}
