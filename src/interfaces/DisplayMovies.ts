export enum FilterTypes {
  Genre = "A",
  Rating = "B",
  Year = "C",
  Language = "D",
  Keyword = "E",
}
export enum SortTypes {
  Name = "name",
  Year = "year",
}
export type FilterTypesInterface = {
  [key in FilterTypes]: string | number;
};

export type SortTypeInterface = {
  sortKey: Partial<SortTypes>;
  asc: boolean;
};

export interface MovieDisplayOptionsInterface {
  filterOption: Partial<FilterTypesInterface> | null;
  sortOption: SortTypeInterface | null;
}
