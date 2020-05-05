export let BUILD_TIME_REGION = process.env.REACT_APP_REGION;

export interface RegionResolverConfig {
  defaultRegion: string;
}

export const configure = ({
  defaultRegion,
}) => {
  BUILD_TIME_REGION = defaultRegion;
}

