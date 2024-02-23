/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
import { PrimaryGeneratedColumn, Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from "typeorm";
import { Base } from "./Base";
import { IsNotEmpty, Length, IsEmail } from "class-validator";

@Entity()
export class mPatients extends Base {
  @IsNotEmpty() 
  @PrimaryGeneratedColumn() 
  patient_id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @Column()
  date_of_birth: Date;

  @IsNotEmpty() @Length(10, 10)
  @Column()
  gender: string;
  
}
