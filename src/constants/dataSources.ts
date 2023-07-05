/**
 * Data sources enums
 */
export enum DATA_SOURCES {
  MY_FITNESS_PAL = 'my_fitness_pal',
  AMAZON = "amazon",
}

export type DataSourceType = `${DATA_SOURCES}`;

export const PRODUCT_CATEGORY_LIST = [
  "Sports & Outdoor",
  "Grocery",
  "Restaurants",
  "Pharmacy",
  "Home",
  "Furniture",
  "Cleaning Supplies",
  "Computer & Electronics",
  "Office",
  "Garden",
  "Kitchen",
  "Clothing",
  "Shoes",
  "Jewelry",
  "Personal Care",
  "Baby & Toddler",
  "Toys & Games",
  "Pets",
  "Books",
  "Arts & Crafts",
  "Experiences",
  "Travel",
  "Education",
];

export const DATA_SOURCE_LOGIN_URLS: { [key in DataSourceType]?: string } = {};

export const DATA_SOURCES_FEATURE = {};
