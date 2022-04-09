import { Inject } from '@nestjs/common';
import { DICORD_CLIENT } from './constants';
export const InjectDiscord = () => Inject(DICORD_CLIENT);
