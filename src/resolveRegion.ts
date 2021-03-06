import { RegionObject, RegionWithDefault, Region } from 'types';
import { BUILD_TIME_REGION } from 'utils';

export function resolveRegion<R extends RegionWithDefault, T> (
  regions: RegionObject<R, T>,
  region?: R,
): T {
  const _region: any = region ?? BUILD_TIME_REGION ?? 'default';
  const obj = regions[_region]

  if (!obj) {
    return regions.default;
  } else if (regions[obj as any]) {
    return regions[obj as any];
  }
  
  return obj;
}

export function lazyResolveRegion<R extends RegionWithDefault, T> (
  regions: RegionObject<R, () => T>,
  region?: R,
): T {
  return resolveRegion<R, () => T>(regions, region)();
}