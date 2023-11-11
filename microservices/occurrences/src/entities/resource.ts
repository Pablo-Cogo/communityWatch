import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  Length,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { Occurrence } from './occurrence';

@Entity('resource')
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsEmpty({ message: 'não é possivel setar valor no id' })
  id!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  resourceName!: string;

  @Column('double', { precision: 10, scale: 2 })
  @IsNumber()
  @Min(0.01)
  resourcePrice!: number;

  @Column('double', { precision: 10, scale: 2 })
  @IsNumber()
  @Min(0)
  resourceQuantity!: number;

  @Column('double', { precision: 10, scale: 2, default: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  resourceReserved!: number;

  @ManyToMany(() => Occurrence, (occurrence) => occurrence.resources)
  @JoinTable({ name: 'occurrence_resources' })
  occurrences!: Occurrence[];
}
