import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Products } from '../../product/entity/product.entity'

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    // test for migrations
    // @Column({ length: 100, default: "" })
    // caste: string;

    // test for migrations
    // @Column({ length: 100, nullable: true })
    // caste: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Products, (product) => product.created_by)
    products: Products[];
}