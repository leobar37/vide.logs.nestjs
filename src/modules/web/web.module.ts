import { Module } from '@nestjs/common';
import { ContactController } from './controllers';
import { ContactService } from './services';
import { ConfigModule } from '@nestjs/config';
const CONTROLLERS = [ContactController];

const SERVICES = [ContactService];

@Module({
  imports: [ConfigModule],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES],
})
export class WebModule {}
