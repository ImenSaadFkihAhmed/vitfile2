import { FileEntity } from '../../file/entities/file.entity';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

@Entity('compte_entity')
export class CompteEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  cin: string;

  @Column()
  phoneNumber: number;

  @Column()
  email: string;

  @Column()
  compagny: string;

  @Column()
  taxIdentificationNumber: string;

  @DeleteDateColumn()
  del : any;
 
  @OneToMany(type=>FileEntity,
    (files)=>files.admin,)
    files:FileEntity[]
}