import { Prop } from '@nestjs/mongoose';
export class CreateAuthDto {
    @Prop([String])
    name: string;

    @Prop([String])
    pwd: number;
    
    @Prop([String])
    email: string;

    @Prop([String])
    profile_image: string;
}
