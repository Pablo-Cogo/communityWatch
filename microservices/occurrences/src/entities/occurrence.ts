import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import {
  Length,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { Resource } from './resource';
import { Address } from './address';

export enum OccurrenceStatus {
  Aberto = 0,
  Processando = 1,
  Fechado = 2,
}

@Entity('occurrence')
export class Occurrence extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @IsEmpty({ message: 'não é possivel setar valor no id' })
  id!: string;

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

  @Column({ nullable: true, type: 'longtext' })
  @IsOptional()
  occurrenceLinkPdf!: string;

  @ManyToMany(() => Resource, (resource) => resource.occurrences)
  resources!: Resource[];

  @ManyToOne(() => Address, (address) => address.occurrences)
  address!: Address;
}
