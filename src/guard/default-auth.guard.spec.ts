import { DefaultAuthGuard } from './default-auth.guard';

describe('DefaultAuthGuard', () => {
  it('should be defined', () => {
    expect(new DefaultAuthGuard()).toBeDefined();
  });
});
