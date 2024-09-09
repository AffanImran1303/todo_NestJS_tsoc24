import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({description:"To register a new user with email",summary:"Register a new user"})
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }
  @Post("login")
  @ApiOperation({description:"Login with email",summary:"Endpoint to login with user email"})
  login(@Body() loginData:LoginDto){
    return this.authService.login(loginData)
  }
}
