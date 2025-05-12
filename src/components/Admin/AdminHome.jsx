import { useState } from "react";
import "./adminHome.css";
import UserDetails from "./UserDetails";


const AdminHome = () => {
  const [selectedPage, setSelectedPage] = useState("products");
  return (
    <div className="admin-home">
      <div className="admin-home-buttons">
        <button onClick={() => setSelectedPage("products")}>Products</button>
        <button onClick={() => setSelectedPage("users")}>Users</button>
      </div>

      {selectedPage === "users" && <UserDetails />}
    </div>
  );
};
export default AdminHome;
