import { CompteEntity } from "../../compte/entity/compte.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { etatfile } from "../etatfile/etatfile";
import { guichet_number } from "../etatfile/enumguichet";
@Entity('File')
export class FileEntity {
    @PrimaryColumn()
    Id:string
    @Column()
    Adress:string
    @Column()
    numerofile:number;
    @Column()
    guichet:guichet_number
    @ManyToOne(
        type=>CompteEntity,
        (admin)=>admin.files,
        {
            eager:true
        }
      )
      admin:CompteEntity
  
     
    
}
