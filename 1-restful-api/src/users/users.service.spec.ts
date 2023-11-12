import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/auth/auth.interface';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const newUser: Profile = {
        userId: 'someUserId',
        email: 'test@example.com',
        password: 'testpassword',
        name: 'John Doe',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: '123 Main St',
        subscribeToNewsletter: true,
      };

      const createdUser = await service.createUser(newUser);

      expect(createdUser).toHaveProperty('userId');
      expect(createdUser.email).toBe(newUser.email);

      // Check if the password is hashed
      const isPasswordHashed = await bcrypt.compare(
        newUser.password,
        createdUser.password,
      );
      expect(isPasswordHashed).toBeTruthy();
    });
  });

  describe('getProfile', () => {
    it('should get user profile without password', async () => {
      const userId = 'someUserId';
      const user = {
        userId,
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'John Doe',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: '123 Main St',
        subscribeToNewsletter: true,
      };
      service.users.push(user);

      const userProfile = await service.getProfile(userId);

      expect(userProfile).toEqual(
        expect.objectContaining({ userId, email: user.email }),
      );
      expect(userProfile).not.toHaveProperty('password');
    });

    it('should throw NotFoundException when user is not found', async () => {
      const userId = 'nonexistentUserId';

      await expect(service.getProfile(userId)).rejects.toThrowError(
        'User not found',
      );
    });
  });

  // Add more test cases for other methods as needed

  afterAll(() => {
    jest.clearAllMocks();
  });
});
