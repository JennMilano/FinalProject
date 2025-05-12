import { useFetchUsersQuery } from "../../api/API";
import "./userDetails.css";

const UserDetails = () => {
  const { data, isLoading, isError } = useFetchUsersQuery();

  return (
    <div className="user-details-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.mailing_address}</td>
              <td>{user.is_admin ? "Admin" : "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
