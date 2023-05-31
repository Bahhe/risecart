import { CommonService, CreateUserDto } from '@app/common';
import { UserLoginDto } from '@app/common';
import { Controller, Inject, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('CommonServiceInterface')
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'register-user' })
  async register(
    @Ctx() context: RmqContext,
    @Payload() createUserDto: CreateUserDto,
  ) {
    this.commonService.acknowledgeMessage(context);
    return this.authService.register(createUserDto);
  }

  @MessagePattern({ cmd: 'user-login' })
  async login(
    @Ctx() context: RmqContext,
    @Payload() userLoginDto: UserLoginDto,
  ) {
    this.commonService.acknowledgeMessage(context);
    return this.authService.login(userLoginDto);
  }

  @MessagePattern({ cmd: 'verify-jwt' })
  async loggedIn(@Ctx() context: RmqContext, @Payload() data: any) {
    this.commonService.acknowledgeMessage(context);
    try {
      const res = this.authService.validateToken(data.jwt);
      return res;
    } catch (e) {
      Logger.error(e);
      return false;
    }
  }
}
