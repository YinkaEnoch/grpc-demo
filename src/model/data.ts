export interface UsersInterface {
  id: string;
  name: string;
  age: number;
}

interface UpdateUserinterface {
  name?: string;
  age?: number;
}

export let Users: UsersInterface[] = [
  { id: '1713727975841', name: 'Ben Sim', age: 12 },
  { id: '1713727998900', name: 'Thompson', age: 10 },
];

export const AddUser = (newUser: UsersInterface) => {
  Users = [...Users, newUser];
};

export const DeleteUser = (id: string) => {
  Users = Users.filter((user) => user.id !== id);
};

export const UpdateUser = (id: string, newData: UpdateUserinterface) => {
  let user = Users.filter((user) => user.id === id)[0];
  console.log({ user });

  // Check if user exist
  if (!user) {
    return false;
  }

  user = { ...user, ...newData };

  Users = Users.filter((user) => user.id !== id);

  Users = [...Users, user];

  return true;
};
