import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ValidRoles } from 'src/authentication/enums/valid-roles.enum';

@InputType()
export class CreateAccount {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25, {
    message: 'Name should be longer than 3 and shorter than 25',
  })
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 25, {
    message: 'Lastname should be longer than 3 and shorter than 25',
  })
  @Field(() => String)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 25, {
    message: 'Password should be longer than 8 and shorter than 25',
  })
  @Field(() => String)
  password: string;

  @IsOptional()
  @IsArray()
  @IsEnum(ValidRoles)
  @Field(() => [ValidRoles], { defaultValue: [ValidRoles.user] })
  roles?: ValidRoles[];
}
