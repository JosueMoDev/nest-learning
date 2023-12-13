import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ValidRole } from 'src/authentication/enums/valid-role.enum';

@InputType()
export class CreateAccountInput {
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
  @IsEnum(ValidRole)
  @Field(() => ValidRole, {
    defaultValue: ValidRole.user,
    nullable: true,
  })
  role?: ValidRole;
}
