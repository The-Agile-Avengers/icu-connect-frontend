import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { logout } from "utils/utils";

export default function LogoutButton() {
  return (
    <div style={{ display: "flex", cursor: "pointer" }} onClick={logout}>
      <LogoutIcon fontSize="small" style={{ marginRight: "0.5em" }} />
      <small>Logout</small>
    </div>
  );
}
