import { Module } from '@nestjs/common';

import { EnvService } from './env/env.service';
import { HttpModule } from './http/http.module';

@Module({
  imports: [HttpModule],
  providers: [EnvService],
})
export class AppModule {}
