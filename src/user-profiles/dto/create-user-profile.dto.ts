import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateUserProfileDto {
  @IsOptional()
  @IsString()
  readonly coverImage?: string;

  @IsOptional()
  @IsString()
  readonly profileImage?: string;

  @IsOptional()
  @IsString()
  readonly bio?: string;

  @IsOptional()
  @IsString()
  readonly nickname?: string;

  @IsOptional()
  @IsString()
  readonly gender?: string;

  @IsOptional()
  @IsDateString()
  readonly birthdate?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;
}
