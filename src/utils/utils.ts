import avatar1 from "images/Avatars/avatar1.png";
import avatar2 from "images/Avatars/avatar2.png";
import avatar3 from "images/Avatars/avatar3.png";
import avatar4 from "images/Avatars/avatar4.png";
import avatar5 from "images/Avatars/avatar5.png";
import avatar6 from "images/Avatars/avatar6.png";
import avatar7 from "images/Avatars/avatar7.png";
import avatar8 from "images/Avatars/avatar8.png";
import avatar9 from "images/Avatars/avatar9.png";
import avatar10 from "images/Avatars/avatar10.png";

export function isLoggedIn(): boolean {
  const authToken = localStorage.getItem("AuthToken");
  return !!authToken;
}

export function logout(): void {
  localStorage.removeItem("AuthToken");
}

export function getJwtToken(): string {
  return localStorage.getItem("AuthToken") || "";
}

export function getDate(creation = " "): string {
  if (creation == " ") {
    const date = new Date();
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const dateString = day + "." + month + "." + year;
    return dateString;
  }
  const date = new Date(creation);
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  const dateString = day + "." + month + "." + year;
  return dateString;
}

export function getAvatar(index: string): string {
  const avatarList = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
    avatar10,
  ];
  return avatarList[+index - 1] ? avatarList[+index - 1] : "This is a problem";
}
