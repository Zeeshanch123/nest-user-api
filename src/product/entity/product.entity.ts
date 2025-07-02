import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Check, JoinColumn } from 'typeorm';
import { Users } from '../../user/entity/user.entity'

@Check(`"price" > 0`)
@Check(`"quantity" >= 0`)
@Entity()
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column('text')
    description: string;

    @Column({ default: true })
    in_stock: boolean;

    @Column('int', { default: 0 })
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn()
    created_at: Date;

    // @ManyToOne(() => Users, (user) => user.products, { onDelete: 'CASCADE' })
    // created_by: Users;

    @ManyToOne(() => Users, (user) => user.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'created_by' })
    created_by: Users;
}

