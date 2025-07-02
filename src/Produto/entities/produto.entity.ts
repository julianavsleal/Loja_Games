import { Categoria } from './../../Categoria/entities/categoria.entity';
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"tb_produtos"})
export class Produto {

@PrimaryGeneratedColumn()
id: number

@IsNotEmpty()
@Column({ length: 150, nullable: false })
nome: string;

@Column({ length: 5000, nullable: true })
foto: string;

@IsNotEmpty()
@Column({
type: 'decimal',
precision: 10,
scale: 2,
nullable: false,
transformer: {
to: (value: number) => value,
from: (value: string) => parseFloat(value),
},
})
preco: number;

@ManyToOne(() => Categoria, (categoria) => categoria.produto, {
onDelete: "CASCADE"
})
categoria : Categoria 

}