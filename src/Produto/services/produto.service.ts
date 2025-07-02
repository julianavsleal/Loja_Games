import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService{
constructor(
@InjectRepository(Produto)
private produtoRepository: Repository<Produto>
){}

async findAll(): Promise<Produto[]>{
return await this.produtoRepository.find();
}

async findById(id: number): Promise<Produto>{

const produto = await this.produtoRepository.findOne({
    where: {id}
});
if (!produto)
throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
return produto;
}

async findAllByNome(nome: string): Promise<Produto[]>{
return await this.produtoRepository.find({
    where:{nome: ILike(`%${nome}%`)}
})
}

private validarFoto(foto: string | undefined): void {
if (!foto || foto.trim() === '') return;

if (foto.length > 5000) {
throw new HttpException(
"O campo foto deve ter no máximo 5000 caracteres",HttpStatus.BAD_REQUEST,);
}

try {
new URL(foto);
} catch (e) {
throw new HttpException(
"A foto deve ser uma URL válida",HttpStatus.BAD_REQUEST,);
}
}

async create(produto: Produto): Promise<Produto>{
return await this.produtoRepository.save(produto);
}

async update(produto: Produto): Promise<Produto>{
await this.findById(produto.id)
return await this.produtoRepository.save(produto);
}

async delete(id: number): Promise<DeleteResult>{
await this.findById(id)
return await this.produtoRepository.delete(id)
}
}