
export class UserResponse {
  public id?: number;
  public token?: string;

  constructor(id?: number, token?: string) {
    this.id = id;
    this.token = token;
  }

}
