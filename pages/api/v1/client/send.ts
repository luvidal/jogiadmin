import { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, CopyObjectCommand } from '@aws-sdk/client-s3';
import { execute } from '../helpers';

const s3 = new S3Client({});

async function send(req: NextApiRequest, res: NextApiResponse) {
  const userid = req.headers['x-userid'] as string || '';
  const { hookid } = req.query;

  try {
    const files = await execute('_clients.sp_send_hook', { hookid });

    for (const { fileid } of files) {
      const sourceKey = `${userid}/${fileid}`;
      const targetKey = `${hookid}/${fileid}`;

      const command = new CopyObjectCommand({
        CopySource: `jogi-files/${sourceKey}`,
        Bucket: 'jogi-hooks',
        Key: targetKey,
      });

      await s3.send(command);
    }

    return res.status(200).json(files);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

export default send;
