export class CreateUserDto {
  readonly accountName: string;
  readonly nickName: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly id: number;
  readonly accountName: string;
  readonly nickName: string;
  readonly password: string;
}
