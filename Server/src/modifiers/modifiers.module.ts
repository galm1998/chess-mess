import { Module } from '@nestjs/common';
import { ModifiersController } from './modifiers.controller';
import { ModifiersService } from './modifiers.service';

@Module({
  controllers: [ModifiersController],
  providers: [ModifiersService],
})
export class ModifiersModule {}