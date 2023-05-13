import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { logout } from "utils/utils";

export default function LogoutButton() {
  return <LogoutIcon onClick={logout} />;
}
