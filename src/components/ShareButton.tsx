import { Button, Snackbar, Tooltip } from "@mui/material";
import React, { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";

export const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    void navigator.clipboard.writeText(window.location.toString());
  };

  return (
    <>
      <Tooltip title={"Copy to clipboard"}>
        <Button onClick={handleClick}>
          <LinkIcon />
        </Button>
      </Tooltip>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  );
};
