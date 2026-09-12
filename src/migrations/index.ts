import * as migration_20260906_183731_initial from './20260906_183731_initial';

export const migrations = [
  {
    up: migration_20260906_183731_initial.up,
    down: migration_20260906_183731_initial.down,
    name: '20260906_183731_initial'
  },
];
