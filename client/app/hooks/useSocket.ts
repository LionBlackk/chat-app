import io from 'socket.io-client';
const socket = io(process.env.NEXT_PUBLIC_BASE_URL_API as string, {
  autoConnect: true,
});
export default function useSocket() {
  return socket;
}
