export interface HashingService {
  hash: (data: string | Buffer) => Promise<string>;
  compare: (data: string | Buffer, hash: string) => Promise<boolean>
}
