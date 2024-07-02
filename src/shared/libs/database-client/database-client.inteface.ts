export interface DatabaseClient {
  connetc(uri: string): Promise<void>;
  disconnetc(): Promise<void>;
}
