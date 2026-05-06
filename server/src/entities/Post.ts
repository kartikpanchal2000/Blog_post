import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	title: string;

	@Column({ type: 'text', nullable: false })
	content: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	author: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	email: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	category: string;

	@Column({ type: 'simple-array', nullable: true })
	tags: string[];

	@Column({ type: 'varchar', length: 20, default: 'Draft' })
	status: string;

	@Column({ type: 'varchar', length: 500, nullable: true })
	thumbnailUrl: string;

	@Column({ type: 'varchar', length: 500, nullable: true })
	shortDescription: string;

	@CreateDateColumn({ type: 'timestamp with time zone' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	updatedAt: Date;
}
