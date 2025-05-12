import { useState } from "react";
import "./adminHome.css";


const AdminHome = () => {
  const [selectedPage, setSelectedPage] = useState("products");
  return (
    <div className="admin-home">
      <div className="admin-home-buttons">
        <button onClick={() => setSelectedPage("products")}>Products</button>
        <button onClick={() => setSelectedPage("users")}>Users</button>
      </div>

    </div>
  );
};
export default AdminHome;
