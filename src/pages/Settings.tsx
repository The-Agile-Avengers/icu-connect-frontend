import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "components/shared/Layout";
import React, { useEffect } from "react";
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
import { Edit, Save } from "@mui/icons-material";
import { UserModel } from "models/UserModel";
import { api } from "utils/api";
import axios, { AxiosResponse } from "axios";

function getAvatar(index: number): string {
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
  return avatarList[index - 1];
}
// TODO delete
const dummy: UserModel = {
  id: 1,
  username: "HansPeter123",
  email: "this is a mail",
  studyArea: "Info",
  avatar: "",
};

export default function Settings() {
  const [editName] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editStudyArea, setEditStudyArea] = React.useState(false);
  const [userSettings, setUserSettings] = React.useState<UserModel>(dummy);

  // TODO enable as soon as backend has solved issue with JWT token, when changing name
  /*const handleEditName = () => {
    setEditName(!editName);
  };*/

  function validateEmail() {
    const email = userSettings.email;
    // eslint-disable-next-line no-useless-escape
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return true;
    }
    alert("Please enter a valide email");
    return false;
  }

  const handleEditEmail = () => {
    console.log("edit", editEmail);
    if (editEmail == false) {
      setEditEmail(true);
      return;
    }
    if (validateEmail()) {
      setEditEmail(!editEmail);
      api
        .put(`/users`, {
          email: userSettings.email,
        })
        .then((response: AxiosResponse<UserModel>) => {
          setUserSettings((userSettings) => ({
            ...userSettings,
            email: response.data.email,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = event.target.value;
    setUserSettings((userSettings) => ({
      ...userSettings,
      email: newEmail,
    }));
  }
  const handleEditStudyArea = () => {
    setEditStudyArea(!editStudyArea);
    if (editStudyArea == false) {
      api
        .put(`/users`, {
          studyArea: userSettings.studyArea,
        })
        .then((response: AxiosResponse<UserModel>) => {
          setUserSettings((userSettings) => ({
            ...userSettings,
            studyArea: response.data.studyArea,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function handleStudyAreaChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newStudyArea = event.target.value;
    setUserSettings((userSettings) => ({
      ...userSettings,
      studyArea: newStudyArea,
    }));
  }

  async function getUserSettings() {
    try {
      const { data } = await api.get<UserModel>(`/users`);
      console.log("data", data);
      setUserSettings(data);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUserSettings();
  }, []);

  return (
    <Layout title="My Settings">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        alignContent="center"
      >
        <Grid item>
          <Avatar src={getAvatar(10)} sx={{ width: 200, height: 200 }} />
        </Grid>
        <Grid item width="60%" maxWidth="300">
          <List>
            <ListItem>
              <ListItem>
                <Typography variant="h6"> Name: </Typography>
              </ListItem>
              {!editName ? (
                <ListItem>
                  <Typography variant="h6">{userSettings?.username}</Typography>
                </ListItem>
              ) : (
                <ListItem>
                  <TextField
                    required
                    variant="filled"
                    value={userSettings?.username}
                    onChange={handleEmailChange}
                  />
                </ListItem>
              )}
              <ListItemIcon>
                {
                  // TODO enable as soon as backend has solved issue with JWT token, when changing name
                  /*editName ? (
                  <Edit onClick={handleEditName} />
                ) : (
                  <Save onClick={handleEditName} />
                )*/
                }
              </ListItemIcon>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItem>
                <Typography variant="h6"> Email: </Typography>
              </ListItem>
              {!editEmail ? (
                <ListItem>
                  <Typography variant="h6"> {userSettings?.email} </Typography>
                </ListItem>
              ) : (
                <ListItem>
                  <TextField
                    required
                    variant="filled"
                    value={userSettings?.email}
                    onChange={handleEmailChange}
                  />
                </ListItem>
              )}
              <ListItemIcon>
                {!editEmail ? (
                  <Edit onClick={handleEditEmail} />
                ) : (
                  <Save onClick={handleEditEmail} />
                )}
              </ListItemIcon>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItem>
                <Typography variant="h6"> Study Area </Typography>
              </ListItem>
              {!editStudyArea ? (
                <ListItem>
                  <Typography variant="h6">
                    {userSettings?.studyArea}
                  </Typography>
                </ListItem>
              ) : (
                <ListItem>
                  <TextField
                    variant="filled"
                    value={userSettings?.studyArea}
                    onChange={handleStudyAreaChange}
                    inputProps={{ maxLength: 30 }}
                  />
                </ListItem>
              )}
              <ListItemIcon>
                {!editStudyArea ? (
                  <Edit onClick={handleEditStudyArea} />
                ) : (
                  <Save onClick={handleEditStudyArea} />
                )}
              </ListItemIcon>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
}
