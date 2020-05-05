export type Region = string;
type Default = 'default';

export type RegionWithDefault = Region | 'default';

export type RegionObject<R extends RegionWithDefault, T> = Partial<Record<R | Default, T>>;

export interface RegionResoverFunc {
  (Region: Region): React.ReactNode;
}

// export interface RegionResolverProps {
//   children?: RegionResoverFunc;
//   regions?: RegionObject<React.ReactNode | Region>;
//   region?: Region;
// }