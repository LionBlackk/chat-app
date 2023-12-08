import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const audioFile: File | null = data.get('audio') as unknown as File;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (!audioFile) {
      return NextResponse.json({
        success: false,
        message: 'No audio file provided',
      });
    }

    const bytes = await audioFile.arrayBuffer();
    const buffer = Buffer.from(bytes).toString('base64');

    // Save the base64 data or perform other actions as needed

    const newAudioFile = await prisma.audioFile.create({
      data: {
        content: buffer,
        name: audioFile.name,
        type: audioFile.type,
        size: audioFile.size,
        userId: currentUser?.id,
      },
    });

    return NextResponse.json(newAudioFile);
  } catch (error) {
    console.error('Error uploading voice file:', error);
    return NextResponse.json({
      success: false,
      message: 'Error uploading voice file',
    });
  }
}
