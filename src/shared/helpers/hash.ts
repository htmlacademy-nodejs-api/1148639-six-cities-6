import crypto from 'node:crypto';

export const createHMAC256 = (line: string, solt: string): string => {
  const shaHasher = crypto.createHmac('sha256', solt);

  return shaHasher.update(line).digest('hex');
};
