import { SetMetadata } from '@nestjs/common';
import { PublicApiPropertyName } from '../../index';

export const PublicApi = () => SetMetadata(PublicApiPropertyName, true);
