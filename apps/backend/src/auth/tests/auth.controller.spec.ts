import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshDto } from '../dto/refresh.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ValidatedUser } from '../strategies/supabase.strategy';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    refresh: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
    getGoogleRedirect: jest.fn(),
    handleGoogleCallback: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should invoke authService.register', async () => {
      const dto: RegisterDto = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };
      const result = { user: { id: 'uuid', email: dto.email, firstName: 'John', lastName: 'Doe' } };
      mockAuthService.register.mockResolvedValue(result);

      expect(await controller.register(dto)).toBe(result);
      expect(service.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should invoke authService.login', async () => {
      const dto: LoginDto = {
        email: 'test@example.com',
        password: 'Password123!',
      };
      const result = {
        accessToken: 'jwt',
        refreshToken: 'ref',
        expiresIn: 3600,
        user: { id: 'uuid', email: dto.email },
      };
      mockAuthService.login.mockResolvedValue(result);

      expect(await controller.login(dto)).toBe(result);
      expect(service.login).toHaveBeenCalledWith(dto);
    });
  });

  describe('logout', () => {
    it('should invoke authService.logout', async () => {
      const user: ValidatedUser = { id: 'uuid-123', email: 'test@example.com' };
      mockAuthService.logout.mockResolvedValue({});

      expect(await controller.logout(user)).toEqual({});
      expect(service.logout).toHaveBeenCalledWith(user.id);
    });
  });

  describe('refresh', () => {
    it('should invoke authService.refresh', async () => {
      const dto: RefreshDto = { refreshToken: 'old-token' };
      const result = { accessToken: 'new-jwt', refreshToken: 'new-ref', expiresIn: 3600 };
      mockAuthService.refresh.mockResolvedValue(result);

      expect(await controller.refresh(dto)).toBe(result);
      expect(service.refresh).toHaveBeenCalledWith(dto);
    });
  });

  describe('forgotPassword', () => {
    it('should invoke authService.forgotPassword', async () => {
      const dto: ForgotPasswordDto = { email: 'test@example.com' };
      const result = { message: 'instructions sent' };
      mockAuthService.forgotPassword.mockResolvedValue(result);

      expect(await controller.forgotPassword(dto)).toBe(result);
      expect(service.forgotPassword).toHaveBeenCalledWith(dto);
    });
  });

  describe('resetPassword', () => {
    it('should invoke authService.resetPassword', async () => {
      const dto: ResetPasswordDto = { password: 'NewPassword123!', token: 'reset-token' };
      const result = { message: 'password reset' };
      mockAuthService.resetPassword.mockResolvedValue(result);

      expect(await controller.resetPassword(dto)).toBe(result);
      expect(service.resetPassword).toHaveBeenCalledWith(dto);
    });
  });

  describe('googleLogin', () => {
    it('should invoke authService.getGoogleRedirect', async () => {
      const result = { url: 'https://google.com/oauth' };
      mockAuthService.getGoogleRedirect.mockResolvedValue(result);

      expect(await controller.googleLogin()).toBe(result);
      expect(service.getGoogleRedirect).toHaveBeenCalled();
    });
  });

  describe('googleCallback', () => {
    it('should invoke authService.handleGoogleCallback', async () => {
      const code = 'oauth-code';
      const result = {
        accessToken: 'jwt',
        refreshToken: 'ref',
        expiresIn: 3600,
        user: { id: 'uuid', email: 'test@example.com' },
      };
      mockAuthService.handleGoogleCallback.mockResolvedValue(result);

      expect(await controller.googleCallback(code)).toBe(result);
      expect(service.handleGoogleCallback).toHaveBeenCalledWith(code);
    });
  });

  describe('getMe', () => {
    it('should return current authenticated user object from context', async () => {
      const user: ValidatedUser = { id: 'uuid', email: 'test@example.com' };
      expect(await controller.getMe(user)).toBe(user);
    });
  });
});
