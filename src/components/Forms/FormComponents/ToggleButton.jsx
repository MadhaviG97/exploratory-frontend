import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import PublicIcon from "@material-ui/icons/Public";
import VpnLockIcon from "@material-ui/icons/VpnLock";

export default function ToggleButtons(props) {
  const [alignment, setAlignment] = React.useState(props.visibility_public);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment);
    props.onChange(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      disabled={props.disabled}
      onChange={handleAlignment}
      aria-label="Visibility Public"
    >
      <ToggleButton value={1} aria-label="Public">
        <PublicIcon />
      </ToggleButton>
      <ToggleButton value={0} aria-label="Private">
        <VpnLockIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
