import {
  CreateUserDto,
  User,
  UserLoginDto,
  UsersRepositoryInterface,
} from '@app/common';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepositoryInterface')
    private usersRepository: UsersRepositoryInterface,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const duplicate = await this.usersRepository.findByCondition({
      where: { email },
    });

    if (duplicate) {
      throw new RpcException(
        new ConflictException('Email address is already in use'),
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(newUser);

    delete savedUser.password;

    return savedUser;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findByCondition({
      where: { email },
    });

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new RpcException(new UnauthorizedException('Invalid credentials'));
    }

    return user;
  }

  async login(loginUserDto: UserLoginDto) {
    const { email, password } = loginUserDto;
    const user = await this.validate(email, password);

    const payload = { email: user.email, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}
