import React from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { FileModel } from "utils/types";
import { getAvatar, getDate } from "utils/utils";
import { Delete } from "@mui/icons-material";
import { api } from "utils/api";

interface Props {
  communityId: string;
  communityFiles: FileModel[];
  // eslint-disable-next-line no-unused-vars
  deleteCommunityFile: (id: number) => void;
}

// shows the uploaded files and handles the file download
export function CommunityFiles({
  communityId,
  communityFiles,
  deleteCommunityFile,
}: Props) {
  const [openDialog, setOpenDialog] = React.useState(false);

  // Open the delete dialog
  const handleDialogDeleteFile = () => {
    setOpenDialog(true);
  };

  // Close the delete dialog
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = (file: FileModel) => {
    try {
      void api
        .delete(`/communities/${communityId}/files/${file.id}`)
        .then(() => {
          deleteCommunityFile(file.id);
          setOpenDialog(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // request to download a file
  const handleDownload = async (file: FileModel) => {
    try {
      const response = await api.get(`${file.filePath}`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: response.headers["content-type"],
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ my: 4, width: "100%" }}>
      <Paper sx={{ p: 2 }}>
        <table
          style={{ width: "100%", backgroundColor: "white", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>File Name</th>
              <th style={{ textAlign: "left" }}>Upload Date</th>
              <th style={{ textAlign: "left" }}>Uploader</th>
              <th style={{ textAlign: "left" }}>Download</th>
              <th style={{ textAlign: "left" }}> </th>
            </tr>
          </thead>
          <tbody>
            {communityFiles.map((file) => (
              <tr key={file.id}>
                <td style={{ textAlign: "left" }}>{file.fileName}</td>
                <td style={{ textAlign: "left" }}>{getDate(file.creation)}</td>
                <td style={{ textAlign: "left" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title={file.user.username}>
                      <Avatar
                        sx={{ mr: 1 }}
                        src={getAvatar(file.user.avatar)}
                      />
                    </Tooltip>
                  </Box>
                </td>
                <td style={{ textAlign: "left" }}>
                  <FileDownloadIcon
                    style={{ transition: "color 0.2s ease-in-out" }}
                    onClick={() => void handleDownload(file)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "green")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.color = "gray")}
                  />
                </td>
                <td style={{ textAlign: "left" }}>
                  {file.hasUploaded && (
                    <>
                      <IconButton
                        onClick={handleDialogDeleteFile}
                        sx={{ ml: "auto" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "green")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "gray")
                        }
                      >
                        <Delete />
                      </IconButton>
                      <Dialog
                        open={openDialog}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle>
                          Are you sure you want to delete {file?.fileName}?
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Hey there! Before you delete this file, just
                            remember that it is always a good idea to make sure
                            you have a backup copy, because you never know when
                            Thanos might snap his fingers and wipe out half the
                            files on your hard drive!
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={() => handleDelete(file)} autoFocus>
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Box>
  );
}

export default CommunityFiles;
