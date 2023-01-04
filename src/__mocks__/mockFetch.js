import currencies from './currencies';

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(currencies),
});

export default mockFetch;
