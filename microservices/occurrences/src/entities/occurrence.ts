import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import {
  Length,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Resource } from './resource';

export enum OccurrenceStatus {
  Aberto = 0,
  Processando = 1,
  Fechado = 2,
}

@Entity('occurrence')
export class Occurrence extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  private _id!: string;

  get id(): string {
    return this._id;
  }

  set id(_: string) {}

  @Column({ type: 'uuid' })
  userId!: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 255)
  occurrenceDescription!: string;

  @Column()
  @IsNotEmpty()
  occurrenceCobradeCode!: string;

  @Column({ type: 'enum', enum: OccurrenceStatus })
  @IsEnum(OccurrenceStatus)
  occurrenceStatus!: OccurrenceStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsDateString()
  occurrenceInitialDate!: Date;

  @Column({ type: 'timestamp', nullable: true })
  @IsOptional()
  @IsDateString()
  occurrenceFinalDate!: Date;

  @Column({ nullable: true })
  @IsOptional()
  occurrenceLinkPdf!: string;

  @ManyToMany(() => Resource, (resource) => resource.occurrences)
  resources!: Resource[];
}
