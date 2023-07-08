import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountName: string;

  @Column()
  nickName: string;

  @Column()
  password: string;
}
