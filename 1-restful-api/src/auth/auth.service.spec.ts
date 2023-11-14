import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Profile } from './auth.interface';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('signIn', () => {
    it('should return success message and access token on valid credentials', async () => {
      const email = 'user@example.com';
      const password = 'password123';
      const user: Profile = {
        userId: '1',
        email,
        password,
        name: 'John Doe',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: '123 Main St',
        subscribeToNewsletter: true,
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);

      const result = await authService.signIn(email, password);

      expect(result).toEqual({
        message: 'login success',
        access_token: 'Bearer faketoken_user1',
      });
    });

    it('should throw UNAUTHORIZED exception on invalid credentials', async () => {
      const email = 'user@example.com';
      const password = 'incorrectPassword';

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      await expect(authService.signIn(email, password)).rejects.toThrowError(
        new HttpException('user not found', HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('register', () => {
    it('should throw INTERNAL_SERVER_ERROR exception on createUser error', async () => {
      const newUser: Profile = {
        userId: '3',
        email: 'anotheruser@example.com',
        password: 'password456',
        name: 'Another User',
        dateOfBirth: '1988-09-30',
        gender: 'male',
        address: '789 Third St',
        subscribeToNewsletter: true,
      };

      jest
        .spyOn(usersService, 'createUser')
        .mockRejectedValue(new Error('Some error'));

      await expect(authService.register(newUser)).rejects.toThrowError(
        new HttpException('Some error', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
