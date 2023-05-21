import React, { useState } from "react";
import { Button, Grid, InputLabel, Paper } from "@mui/material";
import { FileModel } from "utils/types";
import { api } from "utils/api";
import { AxiosResponse } from "axios";

type Props = {
  moduleId: string;
  // eslint-disable-next-line no-unused-vars
  addCommunityFiles: (file: FileModel) => void;
};

// Component handles file upload
const FileUpload: React.FC<Props> = ({
  moduleId,
  addCommunityFiles,
}: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUploadClick = () => {
    if (selectedFile) {
      void handleFileUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  // request to upload a file
  const handleFileUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      void api
        .post(`/communities/${moduleId}/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: AxiosResponse<FileModel>) => {
          addCommunityFiles({
            id: response.data.id,
            creation: response.data.creation,
            fileName: response.data.fileName,
            filePath: response.data.filePath,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            hasUploaded: response.data.hasUploaded,
            user: {
              id: response.data.user.id,
              username: response.data.user.username,
              email: response.data.user.email,
              avatar: response.data.user.avatar,
              studyArea: response.data.user.studyArea,
            },
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <InputLabel htmlFor="file-upload">Choose a file:</InputLabel>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileInputChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleFileUploadClick}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default FileUpload;
