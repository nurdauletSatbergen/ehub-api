import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET ?? 'secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh_secret',
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
    refreshTokenTtl: process.env.JWT_REFRESH_TOKEN_TTL ?? '7d'
  }
})
