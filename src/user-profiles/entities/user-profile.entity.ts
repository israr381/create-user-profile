import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('user_profiles') // Add table name for clarity
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  coverImage?: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true, type: 'date' })
  birthdate?: Date;

  @Column({ nullable: true })
  name?: string;

  @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn() // JoinColumn indicates that this is the owning side of the relationship
  user: UserEntity;
}
