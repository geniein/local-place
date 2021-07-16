import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop([String])
  name: string;

  @Prop([String])
  pwd: string;
  
  @Prop([String])
  email: string;

  @Prop([String])
  profile_image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
