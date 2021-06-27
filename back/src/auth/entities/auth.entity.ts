import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @Prop([String])
  name: string;

  @Prop([String])
  pwd: number;
  
  @Prop([String])
  email: string;

  @Prop([String])
  profile_image: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
