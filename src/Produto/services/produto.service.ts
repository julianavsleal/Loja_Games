import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { CategoriaService } from "../../Categoria/services/categoria.service";

@Injectable()
export class ProdutoService{
constructor(
@InjectRepository(Produto)
private produtoRepository: Repository<Produto>,
private categoriaService: CategoriaService  
){}

async findAll(): Promise<Produto[]>{
return await this.produtoRepository.find({
    relations: {
        categoria: true
    }
});
}

async findById(id: number): Promise<Produto>{

let produto = await this.produtoRepository.findOne({
    where: {id},

relations: {
        categoria: true }
    });

if (!produto)
throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
return produto;
}

async findAllByNome(nome: string): Promise<Produto[]>{
return await this.produtoRepository.find({
    where:{nome: ILike(`%${nome}%`)},

relations: {
    categoria: true}
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
await this.categoriaService.findById(produto.categoria.id)
return await this.produtoRepository.save(produto);
}

async update(produto: Produto): Promise<Produto>{
await this.findById(produto.id)
await this.categoriaService.findById(produto.categoria.id)
return await this.produtoRepository.save(produto);
}

async delete(id: number): Promise<DeleteResult>{
await this.findById(id)
return await this.produtoRepository.delete(id)
}
}