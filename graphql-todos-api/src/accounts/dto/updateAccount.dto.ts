import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ValidRoles } from 'src/authentication/enums/valid-roles.enum';

@InputType()
export class UpdateAccount {
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
  @IsArray()
  @IsEnum(ValidRoles)
  @Field(() => [ValidRoles])
  roles?: ValidRoles[];

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean)
  isActive: boolean;
}
