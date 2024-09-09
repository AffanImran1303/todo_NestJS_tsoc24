import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly databaseServices:DatabaseService){}
  async create(createTodoDto: CreateTodoDto, email:string) {
    try{
      const user=await this.databaseServices.user.findUnique({where:{email}});
      if(!user){
        throw new Error('User not found');
      }
    let data:Prisma.TodoCreateInput={
      description:createTodoDto.description,
      task:createTodoDto.task,
      status:"ACTIVE",
      user:{
        connect:{email:user.email},
      },
    }
    console.log(data);
    return await this.databaseServices.todo.create({data});
  }
  catch(err){
    return err
  }

  }
 async findAll(userEmail:string) {
    return await this.databaseServices.todo.findMany({
      where:{
        userEmail:userEmail
      },
    });
  }

 async findOne(id: number) {
    return await this.databaseServices.todo.findFirst({
      where:{
        id:id
      }
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.databaseServices.todo.update({
      where:{
        id:id
      },
      data:updateTodoDto
    });
  }

  async remove(id: number) {
    return await this.databaseServices.todo.delete({
      where:{
        id:id
      }
    });
  }
}
