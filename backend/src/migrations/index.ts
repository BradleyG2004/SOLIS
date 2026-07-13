import * as migration_20260703_140206_initial from './20260703_140206_initial';
import * as migration_20260703_143621_add_category_and_laundry_offer_images from './20260703_143621_add_category_and_laundry_offer_images';
import * as migration_20260713_100000_add_whatsapp_number from './20260713_100000_add_whatsapp_number';

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
  {
    up: migration_20260713_100000_add_whatsapp_number.up,
    down: migration_20260713_100000_add_whatsapp_number.down,
    name: '20260713_100000_add_whatsapp_number'
  },
];
