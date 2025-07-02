import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './Produto/produto.module';
import { Produto } from './Produto/entities/produto.entity';

@Module({
  imports: [
  TypeOrmModule.forRoot({
  type: "mysql",
  host:"localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "db_lojagames",
  entities: [Produto],
  synchronize: true,
  }),
  ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
