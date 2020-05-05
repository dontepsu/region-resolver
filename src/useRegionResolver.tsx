import React from 'react';
import { Region, RegionObject, RegionWithDefault } from 'types';
import { resolveRegion, lazyResolveRegion } from 'resolveRegion';

export interface UseRegionResolverOptions<R extends RegionWithDefault, T> {
  region?: R;
  regions: RegionObject<R, T> | RegionObject<R, () => T>;
  lazy?: boolean;
}

export function useRegionResolver<R extends Region, T> (options?: UseRegionResolverOptions<R, T>) {
  const resolved = React.useMemo<T>(() => {
    if (options.lazy) {
      return lazyResolveRegion<R, T>(options.regions as any, options.region);
    }
    return resolveRegion<R, T>(options.regions as any, options.region);
  }, [ options.region, options.regions ]);

  return { resolved };
}