'use client';

import { useEffect } from 'react';
import useActiveChannel from '../hooks/useActiveChannel';
import useActiveList from '../hooks/useActiveList';

const ActiveStatus = () => {
  const { members } = useActiveList();
  useActiveChannel();
  // console.log('acitive status: ' + members.length);
  // useEffect(() => {
  // console.log(members);
  // Thực hiện các hành động cần thiết khi members thay đổi
  // }, [members]);

  return null;
};

export default ActiveStatus;
