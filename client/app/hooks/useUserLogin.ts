// //useUserLogin.ts
// import { useEffect } from 'react';
// import useSocket from './useSocket';

// const useUserLogin = () => {
//   const socket = useSocket();
//   console.log('useUserLogin');
//   useEffect(() => {
//     socket.on('user_logged_in', (userData) => {
//       // Thực hiện các hành động khi người dùng đăng nhập
//       console.log('User logged in:', userData);
//     });

//     return () => {
//       // Xóa listener khi component unmount
//       socket.off('user_logged_in');
//     };
//   }, [socket]);
// };

// export default useUserLogin;
