import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserResponseDto } from "./dtos/user-response.dto";
import { User } from "./schema/user.schema";
import { UserService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get(":id")
  async findOne(
    @Param("id")
    id: string
  ): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body()
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: string) {
    this.userService.deleteUser(id);
  }
}
