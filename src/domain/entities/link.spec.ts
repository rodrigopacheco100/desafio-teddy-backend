import { Link } from './link';

describe(Link.name, () => {
  process.env.APP_BASE_URL = 'http://localhost:3000';

  it('should be able to get shortened url', () => {
    const link = Link.create({
      fullUrl: 'http://example.com',
      shortenedCode: 'ABCDEF',
      userId: 'user-1',
    });

    expect(link.shortenedUrl).toBe('http://localhost:3000/ABCDEF');
  });
});
