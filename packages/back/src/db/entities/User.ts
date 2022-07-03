import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const userRole = {
  '0': 'user',
  '10': 'admin',
};

interface I_User {
  sequence: number;
  id: string;
  name: string;
  profile?: string;
}

@Entity()
export class User implements I_User {
  @PrimaryGeneratedColumn('increment')
  sequence!: number;

  @Column()
  id!: string;

  @Column()
  name!: string;

  @Column({
    default: 0,
  })
  level!: number;

  @Column()
  profile?: string;
}
