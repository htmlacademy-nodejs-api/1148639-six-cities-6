export const getMongoURI = (
  username: string,
  password: string,
  host: string,
  port: string,
  database: string,
): string => {
  return `mongodb://${username}:${password}@${host}:${port}/${database}?authSoruce=admin`;
}
