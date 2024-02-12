import styled from "@emotion/styled";
import { Divider, IconButton, List, Toolbar, useTheme } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from "@mui/material/Drawer";
import { Theme } from '@mui/material/styles';
import { MainListItems, SecondaryListItems } from "./listItems";

const drawerWidth = 240;

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ open, theme }: { open: boolean, theme: Theme }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

interface DrawerProps {
  open: boolean,
  toggleFunction: Function
}

const Drawer = (props: DrawerProps) => {
  const { open, toggleFunction } = props;
  const theme = useTheme();

  return (
    <StyledDrawer variant="permanent" open={open} theme={theme}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={() => toggleFunction()}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <>
        <MainListItems />
        <Divider sx={{ my: 1 }} />
        <SecondaryListItems />
        </>
      </List>
    </StyledDrawer>
  );
}

export { Drawer };
