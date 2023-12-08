import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;
  const audio = await prisma.audioFile.findFirst({
    where: {
      id: pid as string,
    },
  });
  if (!audio) {
    return res.status(404).send('Invalid file id');
  }
  const myBuffer = Buffer.from(audio.content, 'base64');
  return res.status(200).setHeader('content-type', audio.type).send(myBuffer);
}
//giúp xác định loại nội dung của phản hồi, nó thông báo cho client hiểu và hiển thị nội dung được gửi từ server
