import { Injectable } from '@nestjs/common';

interface user {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: Array<user>;
  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username) {
    return this.users.find((user) => user.username === username);
  }
}
