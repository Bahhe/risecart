import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface CommonServiceInterface {
  getRmqOptions(queue: string, noAck: boolean): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}
