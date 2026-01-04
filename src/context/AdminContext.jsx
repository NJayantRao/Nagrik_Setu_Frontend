import { createContext, useState } from "react";

export const AdminDataContext = createContext();

function AdminContext(props) {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminUniqueId, setAdminUniqueId] = useState("");
  return (
    <div>
      <AdminDataContext.Provider
        value={{
          adminName,
          setAdminName,
          adminEmail,
          setAdminEmail,
          adminPassword,
          setAdminPassword,
          adminAddress,
          setAdminAddress,
          adminPhone,
          setAdminPhone,
          adminUniqueId,
          setAdminUniqueId,
        }}
      >
        {props.children}
      </AdminDataContext.Provider>
    </div>
  );
}

export default AdminContext;
