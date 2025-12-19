import type { User } from "../types/user";

type Props = {
  users: User[];
  onDelete: (id: string) => void;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
};

const UserList = ({ users, onDelete, onView, onEdit }: Props) => {
  //const [users, setUsers] = useState<User[]>([]);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Full name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.fullname}</td>
            <td>
              <button onClick={() => onView(user)}>View</button>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
