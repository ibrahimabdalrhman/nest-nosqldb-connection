import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class User {
  @Prop()
  id: string;
  @Prop()
  username: string;

  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  country: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
