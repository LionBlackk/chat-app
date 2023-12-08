import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
const MAX_FILE_SIZE = 64 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const contentType = request.headers.get('content-type');
    if (contentType && contentType.includes('multipart/form-data')) {
      const data = await request.formData();
      const file: File | null = data.get('file') as unknown as File;
      if (!file) {
        return NextResponse.json({ success: false });
      }
      if (file.size > MAX_FILE_SIZE) {
        return new NextResponse('File size exceeds the maximum allowed size', {
          status: 400,
        });
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes).toString('base64');
      const newFile = await prisma.file.create({
        data: {
          content: buffer,
          name: file.name,
          type: file.type,
          size: file.size,
          userId: currentUser?.id,
        },
      });
      return NextResponse.json(newFile);
    } else if (contentType && contentType.includes('application/json')) {
      const body = await request.json();
      const { id } = body;
      if (id) {
        const file = await prisma.file.findUnique({
          where: {
            id: id,
          },
        });
        if (file) {
          return NextResponse.json(file);
        }
      }
    }
    // content type is neither JSON nor form data
    return new NextResponse('Invalid Request', { status: 400 });
  } catch (error) {
    console.log(`ERROR UPLOAD`);
    return new NextResponse('ERROR', { status: 500 });
  }
}
