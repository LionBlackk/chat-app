import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { triggerClient } from '@/app/libs/trigger';
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId, file, audio } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        file: file,
        audio: audio,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    await triggerClient(conversationId, 'messages/new', newMessage);

    const updateConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    // await triggerClient(conversationId, 'messages/new', newMessage);

    const lastMessage =
      updateConversation.messages[updateConversation.messages.length - 1];

    updateConversation.users.forEach((user) => {
      triggerClient(user.email!, 'conversation/update', {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    // const triggerPromises = [];
    // triggerPromises.push(triggerClient(conversationId, 'messages/new', newMessage));

    // const lastMessage = updateConversation.messages[updateConversation.messages.length - 1];
    // updateConversation.users.forEach((user) => {
    //   triggerPromises.push(triggerClient(user.email!, 'conversation/update', {
    //     id: conversationId,
    //     messages: [lastMessage],
    //   }));
    // });

    // await Promise.all(triggerPromises);

    return NextResponse.json(newMessage);
  } catch (error: any) {
    return new NextResponse('Invalid Error', { status: 500 });
  }
}
