import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const configStageKV = {
  dev: 'dev',
  development: 'dev',
  test: 'test',
  production: 'prod',
  prod: 'prod',
  stage: 'stage',
};

const env = process.env.STAGE || 'production';

export default () => {
  return yaml.load(
    readFileSync(
      join(process.cwd(), `./.conf/${configStageKV[env]}.yml`),
      'utf8',
    ),
  ) as Record<string, any>;
};
