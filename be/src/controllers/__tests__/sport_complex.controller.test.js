import { jest } from '@jest/globals';

const mockSearch = jest.fn();
const mockGetDetails = jest.fn();
const mockNearby = jest.fn();

jest.unstable_mockModule('../../services/sport_complex.service.js', () => ({
  searchSportComplexService: mockSearch,
  getSportComplexDetailsService: mockGetDetails,
  getSportComplexByNearbyLocationService: mockNearby
}));
// Chuc nang can test
const { searchSportComplex } = await import('../sport_complex.controller.js');

describe('searchSportComplex controller', () => {
  let req, res;
  beforeEach(() => {
    mockSearch.mockReset();
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });
  // 1. Test các trường hợp bình thường
  test('uses default values when no query params', async () => {
    req = { query: {} };
    const fakeData = { items: [], total: 0 };
    mockSearch.mockResolvedValue(fakeData);

    await searchSportComplex(req, res);

    expect(mockSearch).toHaveBeenCalledWith('', '', '', '', 1, 10);
    expect(res.json).toHaveBeenCalledWith(fakeData);
  });
  // 2. Test trimming inputs và parsing page/limit
  test('trims inputs and parses page/limit', async () => {
    req = { query: { keyword: '  foo  ', city: '  C  ', district: ' D ', fieldTypes: ' t1,t2 ', page: '2', limit: '5' } };
    const fakeData = { items: ['x'], total: 1 };
    mockSearch.mockResolvedValue(fakeData);

    await searchSportComplex(req, res);

    expect(mockSearch).toHaveBeenCalledWith('foo', 'C', 'D', 't1,t2', 2, 5);
    expect(res.json).toHaveBeenCalledWith(fakeData);
  });
  // 3. Test fallback về min values khi page/limit không hợp lệ
  test('fallbacks to min values for invalid page/limit', async () => {
    req = { query: { page: '0', limit: '0' } };
    const fakeData = { items: [] };
    mockSearch.mockResolvedValue(fakeData);

    await searchSportComplex(req, res);

    expect(mockSearch).toHaveBeenCalledWith('', '', '', '', 1, 10);
    expect(res.json).toHaveBeenCalledWith(fakeData);
  });
  // 4. Test khi service ném lỗi
  test('returns 400 when service throws', async () => {
    req = { query: {} };
    const err = new Error('fail');
    mockSearch.mockRejectedValue(err);

    await searchSportComplex(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().json).toHaveBeenCalledWith({ message: 'fail' });
  });
  // 5. Test phòng chống Injection (đã có validate kiểu string ở controller, nhưng test thêm để chắc chắn)
  test('rejects object injection', async () => {
  req = { query: { city: { $ne: null } } };

  await searchSportComplex(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.status().json).toHaveBeenCalledWith({ message: 'Invalid input' });
  });
  // 6. Test phòng chống Injection với regex đặc biệt
  test('handles special characters safely', async () => {
  req = { query: { keyword: '.*' } };

  await searchSportComplex(req, res);

  expect(mockSearch).toHaveBeenCalled();
});
});
