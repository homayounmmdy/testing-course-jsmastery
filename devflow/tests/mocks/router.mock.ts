const mockRouter = {
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  push: jest.fn(),
  prefetch: jest.fn(),
};

const mockUseRouter = jest.fn(() => mockRouter);

export { mockRouter, mockUseRouter }