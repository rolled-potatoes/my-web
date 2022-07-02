import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

interface I_User {
  id: number;
}

@Entity()
export class User implements I_User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string
}
