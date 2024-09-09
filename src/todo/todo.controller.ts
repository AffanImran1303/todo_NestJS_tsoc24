import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UserEmail } from 'src/common/decorators/user-email.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:'To Add a new task w.r.t to the user email', summary:'Add a new Task'})
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @UserEmail()
userEmail:string) {
    return this.todoService.create(createTodoDto, userEmail);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:'To get all the user task', summary:'To get all the user tasks'})
  @Get()
  async findAll(@UserEmail()
userEmail:string) {
  console.log(userEmail);
    return this.todoService.findAll(userEmail);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To get a specific user task",summary:"To get a specific the user tasks"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To update a specific the user task", summary:"To update a specific user task"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description:"To delete a specific the user task", summary:"To delete specific user task"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
