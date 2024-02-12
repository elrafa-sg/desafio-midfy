import styled from "@emotion/styled";
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, IconButton, Typography, useTheme } from "@mui/material";
import {Theme} from "@mui/material/styles"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const drawerWidth: number = 240;

const StyledAppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({ open, theme }: { open: boolean, theme: Theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));


  interface AppbarProps {
    open: boolean,
    toggleFunction: Function
  }

const Appbar = (props: AppbarProps) => {
    const {open, toggleFunction } = props
    const theme = useTheme()

    return(
        <StyledAppBar position="absolute" open={open} theme={theme}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleFunction()}
            sx={{
              marginRight: '36px',
              ...(props.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            TESTE MIDFY
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </StyledAppBar>
    )
}

  export {Appbar}