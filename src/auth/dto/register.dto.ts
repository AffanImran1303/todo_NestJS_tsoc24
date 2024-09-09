import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class RegisterUserDto{
    @ApiProperty()
    @IsString()
    @Length(2,20)
    name:string
    @IsString()
    @Length(2,20)
    password:string
    @IsEmail()
    email:string
}