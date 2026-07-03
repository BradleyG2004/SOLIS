import * as migration_20260703_140206_initial from './20260703_140206_initial';
import * as migration_20260703_143621_add_category_and_laundry_offer_images from './20260703_143621_add_category_and_laundry_offer_images';

export const migrations = [
  {
    up: migration_20260703_140206_initial.up,
    down: migration_20260703_140206_initial.down,
    name: '20260703_140206_initial',
  },
  {
    up: migration_20260703_143621_add_category_and_laundry_offer_images.up,
    down: migration_20260703_143621_add_category_and_laundry_offer_images.down,
    name: '20260703_143621_add_category_and_laundry_offer_images'
  },
];
