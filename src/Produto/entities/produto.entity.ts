import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"tb_produtos"})
export class Produto{

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
}