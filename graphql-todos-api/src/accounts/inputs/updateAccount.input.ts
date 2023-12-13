import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ValidRole } from 'src/authentication/enums/valid-role.enum';

@InputType()
export class UpdateAccountInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => ID)
  id: string;

  @IsOptional()
  @IsString()
  @Length(3, 25, {
    message: 'Name should be longer than 3 and shorter than 25',
  })
  @Field(() => String)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(3, 25, {
    message: 'Lastname should be longer than 3 and shorter than 25',
  })
  @Field(() => String)
  lastname?: string;

  @IsOptional()
  @IsEmail()
  @Field(() => String)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 25, {
    message: 'Password should be longer than 8 and shorter than 25',
  })
  @Field(() => String)
  password?: string;

  @IsOptional()
  @IsEnum(ValidRole)
  @Field(() => ValidRole)
  role?: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean)
  isActive: boolean;
}
