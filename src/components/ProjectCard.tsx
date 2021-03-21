import React, {ReactElement} from 'react'
import {makeStyles, Theme} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {Project} from '../features/projectsSlice'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minWidth: 255,
        '& h2': {
            marginBottom: theme.spacing(3)
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}))


export const ProjectCard: React.FC<Project> = ({projectTitle, projectManager, projectAdmin, dateStart, dateEnd}): ReactElement => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    <b>{projectTitle}</b>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Project manager: <b>{projectManager}</b>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Project admin: <b>{projectAdmin}</b>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Date start: <b>{dateStart}</b>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Date end: <b>{dateEnd}</b>
                </Typography>
            </CardContent>
        </Card>
    )
}
