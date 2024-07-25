import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schema/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async findUsers(): Promise<User[]> {
    const users = await this.UserModel.find();
    return users;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.UserModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.UserModel.create(createUserDto);
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      id,
      updateUserDto
    );
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.UserModel.findByIdAndDelete(id);
  }
}
