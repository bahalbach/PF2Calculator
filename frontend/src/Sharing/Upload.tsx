import { Button, useMediaQuery } from "@mui/material";
import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import useShareWithImgur from "./useShareWithImgur";
import useExportCsv from "./useExportCsv";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const ShareExport = ({ byLevel = true }: { byLevel?: boolean }) => {
  const id = `share-export-${byLevel ? "by-level" : "single-level"}`;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isBigEnough = useMediaQuery((theme: any) => {
    return theme.breakpoints.up("sm");
  });
  // const shareWithImgur = useShareWithImgur(byLevel);
  const exportCsv = useExportCsv();

  return (
    <>
      <Button
        id={id}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color="secondary"
        endIcon={<ShareIcon />}
      >
        {isBigEnough ? "Share/Export" : "Share"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { "aria-labelledby": id },
        }}
      >
        {/* <MenuItem
          onClick={() => {
            shareWithImgur();
            handleClose();
          }}
        >
          Share with Imgur
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            exportCsv();
            handleClose();
          }}
        >
          Export to CSV
        </MenuItem>
      </Menu>
    </>
  );
};
