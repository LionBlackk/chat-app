/**
 * This function is an API route that retrieves a file from a database using its ID and sends it as a
 * response with the appropriate content type.
 * @param {NextApiRequest} req - The `req` parameter is an object that represents the incoming HTTP
 * request. It contains information such as the request method, headers, query parameters, and body.
 * @param {NextApiResponse} res - The `res` parameter is an instance of the `NextApiResponse` class,
 * which represents the HTTP response that will be sent back to the client. It provides methods and
 * properties for setting the response status, headers, and body.
 * @returns The code is returning a response with the content of a file. If the file is found in the
 * database, it will be converted from base64 encoding to a buffer and sent as the response body. The
 * response will have a status code of 200 and the "content-type" header will be set to the file's
 * type. If the file is not found, a 404 status code with the
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;
  const file = await prisma.file.findFirst({
    where: {
      id: pid as string,
    },
  });
  if (!file) {
    return res.status(404).send('Invalid file id');
  }
  const myBuffer = Buffer.from(file.content, 'base64');
  return res.status(200).setHeader('content-type', file.type).send(myBuffer);
}
//giúp xác định loại nội dung của phản hồi, nó thông báo cho client hiểu và hiển thị nội dung được gửi từ server
