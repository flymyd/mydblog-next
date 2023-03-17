import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  const Imap = require('imap');
  const MailParser = require('mailparser').MailParser;
  const promisify = require('util').promisify;

  // 创建imap对象
  const imap = new Imap({
    user: 'flymyd@139.com',
    password: 'b9216ee169ddd7931600',
    host: 'imap.139.com',
    port: 993,
    tls: true
  });

  // await res.status(200).json(resp)
}
