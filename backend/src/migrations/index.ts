import * as migration_20260703_140206_initial from './20260703_140206_initial';

export const migrations = [
  {
    up: migration_20260703_140206_initial.up,
    down: migration_20260703_140206_initial.down,
    name: '20260703_140206_initial'
  },
];
