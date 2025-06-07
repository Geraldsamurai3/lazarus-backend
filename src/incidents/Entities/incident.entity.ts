import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('incidents')
export class Incident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  type: string;

  @Column('text')
  description: string;

  @Column('double')
  latitude: number;

  @Column('double')
  longitude: number;

  @Column('simple-array', { nullable: true })
  mediaUrls: string[];

  @CreateDateColumn()
  timestamp: Date;
}
