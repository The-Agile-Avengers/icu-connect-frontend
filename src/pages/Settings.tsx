import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Layout from "components/shared/Layout";
import React, { useEffect } from "react";
import { CameraAlt, Edit, Save } from "@mui/icons-material";
import { StudyAreaModel, UserModel } from "utils/types";
import { api } from "utils/api";
import axios, { AxiosResponse } from "axios";
import { getAvatar } from "utils/utils";

// Used as dummy for the userModel
const dummy: UserModel = {
  id: 1,
  username: "HansPeter123",
  email: "this is a mail",
  studyArea: { id: 1, name: "my Area" },
  avatar: "",
};

export default function Settings() {
  const [editName] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editStudyArea, setEditStudyArea] = React.useState(false);
  const [userSettings, setUserSettings] = React.useState<UserModel>(dummy);
  const [openAvatarDialog, setOpenAvatarDialog] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedAvatarIndex, setSelectedAvatarIndex] =
    React.useState<number>(-1);

  const [studyAreaList, setStudyAreaList] = React.useState<string[]>([]);
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [selectedStudyArea, setSelectedStudyArea] = React.useState(
    userSettings?.studyArea?.name
  );

  // Avatar Selection

  //Handle Dialog
  const handleClickAvatarDialog = () => {
    setOpenAvatarDialog(!openAvatarDialog);
  };

  function saveAvatar(): void {
    setOpenAvatarDialog(false);
    api
      .put(`/users`, {
        avatar: (selectedAvatarIndex + 1).toString(),
      })
      .then((response: AxiosResponse<UserModel>) => {
        setUserSettings((userSettings) => ({
          ...userSettings,
          avatar: response.data.avatar,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Email Selection

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
    console.log("my new email", newEmail);
    setUserSettings((userSettings) => ({
      ...userSettings,
      email: newEmail,
    }));
  }

  const handleStudyAreaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("this is my new value", event.target.value);
    setSelectedStudyArea(event.target.value || "");
  };

  // Study Area Selection

  const handleEditStudyArea = () => {
    setEditStudyArea(!editStudyArea);
    if (editStudyArea == true) {
      console.log("change", selectedStudyArea);
      api
        .put(`/users`, {
          //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          studyArea: { name: selectedStudyArea },
        })
        .then((response: AxiosResponse<UserModel>) => {
          console.log(response.data.studyArea);
          setUserSettings((userSettings) => ({
            ...userSettings,
            //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            studyArea: response.data.studyArea,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  async function getUserSettings() {
    try {
      const { data } = await api.get<UserModel>(`/users`);
      console.log("data", data);
      setUserSettings(data);
      setSelectedAvatarIndex(+data.avatar - 1);
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

  const getStudyArea = async () => {
    try {
      const { data } = await api.get<StudyAreaModel[]>("/studyareas");
      const studyAreas: string[] = data.map(
        (studyArea: StudyAreaModel) => studyArea.name
      );
      console.log("data", data);
      console.log(studyAreas);
      setStudyAreaList(studyAreas);
    } catch (error) {
      console.error("Failed to fetch study areas:", error);
    }
  };

  useEffect(() => {
    void getUserSettings();
    void getStudyArea();
  }, []);

  useEffect(() => {
    void getStudyArea();
  }, [selectedStudyArea]);

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
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<CameraAlt onClick={handleClickAvatarDialog} />}
          >
            <Avatar
              src={getAvatar(userSettings.avatar)}
              sx={{ width: 200, height: 200 }}
            />
            <Dialog
              fullScreen={fullScreen}
              open={openAvatarDialog}
              onClose={handleClickAvatarDialog}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle>{"Welcome to the avatar selection!"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Here you get to choose your animal alter ego. Will you be a
                  sly fox, a stubborn donkey, or a confident chicken? Choose
                  carefully, for your animal avatar will reflect your
                  personality and style in the digital world.
                </DialogContentText>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignContent: "space-around",
                    gab: 10,
                  }}
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <Avatar
                      key={index + 1}
                      src={getAvatar((index + 1).toString())}
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        mb: 2,
                        border:
                          selectedAvatarIndex === index
                            ? "3px solid green"
                            : "none",
                        cursor: "pointer",
                        "&:hover": {
                          border: "3px solid green",
                        },
                      }}
                      onClick={() => setSelectedAvatarIndex(index)}
                    />
                  ))}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickAvatarDialog}>Cancel</Button>
                <Button onClick={saveAvatar}>Save</Button>
              </DialogActions>
            </Dialog>
          </Badge>
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
              <ListItemIcon />
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
                    {userSettings?.studyArea?.name}
                  </Typography>
                </ListItem>
              ) : (
                <>
                  <ListItem>
                    <Autocomplete
                      freeSolo
                      id="combo-box-demo"
                      options={studyAreaList}
                      sx={{ width: "100%" }}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      value={userSettings?.studyArea?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          onChange={handleStudyAreaChange}
                          label="Study Area"
                        />
                      )}
                    />
                  </ListItem>
                </>
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
