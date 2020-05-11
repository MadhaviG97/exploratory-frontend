import React from "react";
import { Box, Button } from "@material-ui/core";
import BorderColorIcon from "@material-ui/icons/BorderColor";

export default function EditProject(props) {
  return (
    <Box display="flex" alignContent="center" alignSelf="flex-end" py={1}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => props.handleEditState()}
      >
        <BorderColorIcon />
      </Button>
    </Box>
  );
}
