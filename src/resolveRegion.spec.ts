import {
  lazyResolveRegion,
  resolveRegion,
  configure,
} from '.';

configure({
  defaultRegion: 'b',
});

type TestRegion = 'a' | 'b' | 'c';

describe('regionResolver', () => {
  it ('should resolve correct lazy region from env', () => {    
    const regionObject = {
      a: jest.fn(() => 'region a'),
      b: jest.fn(() => 'region b'),
      c: jest.fn(() => 'region c'),
    };

    const resolved = lazyResolveRegion(regionObject);

    expect(resolved).toEqual('region b');
    expect(regionObject.a.mock.calls.length).toEqual(0);
    expect(regionObject.c.mock.calls.length).toEqual(0);
  });

  it ('should resolve correct configured default region', () => {    
    const resolved = resolveRegion<TestRegion, string>({
      'a': 'region a',
      'b': 'region b',
      'c': 'region c',
    });

    expect(resolved).toEqual('region b');
  });

  it ('should resolve correct lazy configured default region', () => {    
    const regionObject = {
      a: jest.fn(() => 'region a'),
      b: jest.fn(() => 'region b'),
      c: jest.fn(() => 'region c'),
    };

    const resolved = lazyResolveRegion(regionObject, 'c');

    expect(resolved).toEqual('region c');
    expect(regionObject.a.mock.calls.length).toEqual(0);
    expect(regionObject.b.mock.calls.length).toEqual(0);
  });

  it ('should resolve correct region from param', () => {    
    const resolved = resolveRegion<TestRegion, string>({
      'a': 'region a',
      'b': 'region b',
      'c': 'region c',
      default: 'default',
    }, 'c');

    expect(resolved).toEqual('region c');
  });

  it ('should resolve linked region', () => {    
    const resolved = resolveRegion<TestRegion, string>({
      'a': 'c',
      'b': 'region b',
      'c': 'region c',
    }, 'a');

    expect(resolved).toEqual('region c');
  });

  it ('should resolve default region', () => {    
    const resolved = resolveRegion<TestRegion, string>({
      'b': 'region b',
      default: 'default',
    }, 'a');

    expect(resolved).toEqual('default');
  });
});
