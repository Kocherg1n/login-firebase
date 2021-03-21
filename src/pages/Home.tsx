import React, {ReactElement, useEffect, useState} from 'react'
import {NavLink, Route, Switch, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {isLoadingSelector, logOut} from '../features/authSlice'
import {Projects} from './Projects'
import {
    Divider, Toolbar, Typography, List, ListItem, IconButton, Hidden,
    Drawer, AppBar, CssBaseline, ListItemIcon, ListItemText
} from '@material-ui/core'
import {makeStyles, Theme, useTheme, createStyles} from '@material-ui/core/styles'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MenuIcon from '@material-ui/icons/Menu'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import DateRangeIcon from '@material-ui/icons/DateRange'
import AppleIcon from '@material-ui/icons/Apple'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {fetchProjects} from '../features/projectsSlice'
import { useWindowSize } from '../helpers'


const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        toolBar: {
            justifyContent: 'space-between',
            '& button': {
                color: '#fff'
            }
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        list: {
            '& .MuiListItem-root.active': {
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '& svg': {
                    fill: theme.palette.primary.contrastText
                }
            }
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
)

interface HomeProps {
    window?: () => Window;
}

export const Home: React.FC<HomeProps> = (props: HomeProps): ReactElement => {
    const {window} = props
    const classes = useStyles()
    const theme = useTheme()
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const width = useWindowSize()
    const isLoading = useSelector(isLoadingSelector)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        history.push('/projects')
        dispatch(fetchProjects())
    }, [dispatch, history])


    const logOutHandler = (): void => {
        dispatch(logOut())
    }

    const handleDrawerToggle = (): void => {
        setMobileOpen(!mobileOpen)
    }

    const handleDrawerClose = (): void => {
        if (width && width < 600) {
            setMobileOpen(false)
        }
    }

    const drawer = (
        <>
            <div className={classes.toolbar}/>
            <Divider/>
            <List className={classes.list} component='div'>
                <ListItem onClick={handleDrawerClose} button component={NavLink} to='/tasks'>
                    <ListItemIcon>
                        <FormatListBulletedIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Tasks'/>
                </ListItem>
                <ListItem onClick={handleDrawerClose} button component={NavLink} to='/projects'>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Projects'/>
                </ListItem>
                <ListItem onClick={handleDrawerClose} button component={NavLink} to='/calendar'>
                    <ListItemIcon>
                        <DateRangeIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Calendar'/>
                </ListItem>
                <ListItem onClick={handleDrawerClose} button component={NavLink} to='/opportunities'>
                    <ListItemIcon>
                        <AppleIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Opportunities'/>
                </ListItem>
            </List>
            <Divider/>
        </>
    )

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Route path='/tasks' exact>
                        <Typography variant="h6" noWrap>Tasks</Typography>
                    </Route>
                    <Route path='/projects'>
                        <Typography variant="h6" noWrap>Projects</Typography>
                    </Route>
                    <Route path='/calendar'>
                        <Typography variant="h6" noWrap>Calendar</Typography>
                    </Route>
                    <Route path='/opportunities'>
                        <Typography variant="h6" noWrap>Opportunities</Typography>
                    </Route>
                    <IconButton onClick={logOutHandler} disabled={isLoading}>
                        <ExitToAppIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{paper: classes.drawerPaper}}
                        ModalProps={{keepMounted: true}}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer classes={{paper: classes.drawerPaper}}
                            variant="permanent"
                            open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Switch>
                    <Route path='/tasks' exact>
                        <h1>tasks</h1>
                    </Route>
                    <Route path='/projects' component={Projects}/>
                    <Route path='/calendar'>
                        <h1>calendar</h1>
                    </Route>
                    <Route path='/opportunities'>
                        <h1>opportunities</h1>
                    </Route>
                </Switch>
            </main>
        </div>
    )
}
