import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserProfile } from '../../user-profiles/entities/user-profile.entity';

@Entity('users') // Add table name for clarity
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile; // Changed from profiles to profile
}
  