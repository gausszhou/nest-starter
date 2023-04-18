export class CreateUserDto {
  readonly accountName: string ;
  readonly nickName: string;
  readonly password: string;
  readonly repassword: string;
}

export class UpdateUserDto {
  readonly accountName: string;
  readonly nickName: string;
  readonly password: string;
  readonly repassword: string;
}
