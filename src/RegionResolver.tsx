import React from 'react';
import { RegionWithDefault, RegionObject, Region } from 'types';
import { resolveRegion } from 'resolveRegion';

export interface RegionResoverFunc<R> {
  (region: R): React.ReactNode;
};


export interface RegionResolverProps<R extends RegionWithDefault> {
  children?: RegionResoverFunc<R>;
  regions?: RegionObject<R, React.ReactNode | R>;
  region?: R;
}

export function RegionResolver<R extends RegionWithDefault = Region>({
  children,
  regions,
  region,
}: RegionResolverProps<R | 'default'>): React.ReactNode {
  // tslint:disable-next-line: strict-type-predicates
  if (children && typeof children !== 'function') {
    throw new Error('RegionResolver: Children is not a function');
  }
  if (children) {
    return <>{children(region)}</>;
  }
  if (regions) {
    return resolveRegion(regions, region);
  }

  return null;
};