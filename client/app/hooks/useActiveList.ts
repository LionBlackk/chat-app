import { create } from 'zustand';
interface ActiveListStore {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (id: any) => void;
}

const useActiveList = create<ActiveListStore>((set) => ({
  members: [],
  // add: (id) => set((state: any) => ({ members: [...state.members, id] })),
  add: (id) =>
    set((state: any) => {
      // Kiểm tra xem id đã tồn tại trong mảng hay chưa
      if (!state.members.includes(id)) {
        return { members: [...state.members, id] };
      }
      return state; // Nếu đã tồn tại, không thay đổi gì cả
    }),
  remove: (id) =>
    set((state: any) => ({
      members: state.members.filter((memberId: string) => memberId !== id),
    })),
  set: (ids) => set({ members: ids }),
}));
export default useActiveList;

// import { create } from 'zustand';

// interface ActiveListStore {
//   members: string[];
//   add: (id: string) => void;
//   remove: (id: string) => void;
//   set: (ids: string[]) => void;
// }

// const useActiveList = create<ActiveListStore>((set) => ({
//   members: [],
//   add: (id) => set((state) => ({ members: [...state.members, id] })),
//   remove: (id) =>
//     set((state) => ({
//       members: state.members.filter((memberId) => memberId !== id),
//     })),
//   set: (ids) => set({ members: ids }),
// }));

// export default useActiveList;
