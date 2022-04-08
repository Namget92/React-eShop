import { atom } from "recoil";

export const itemsStock = atom({
  key: "itemsStock",
  default: [],
});

export const stockC = atom({
  key: "stockC",
  default: "all",
});

export const arrY = atom({
  key: "arrY",
  default: "all",
});

export const count = atom({
  key: "count",
  default: 0,
});
export const count2 = atom({
  key: "count2",
  default: 1,
});
