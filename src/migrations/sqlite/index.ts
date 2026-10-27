import * as migration_20261008_084211_initial from './20261008_084211_initial';

export const migrations = [
  {
    up: migration_20261008_084211_initial.up,
    down: migration_20261008_084211_initial.down,
    name: '20261008_084211_initial'
  },
];
