import React, {ReactElement, useState} from 'react'
import {Box, Button, Grid, Theme} from '@material-ui/core'
import {CustomModal} from '../components/CustomModal'
import {AddProject} from '../components/AddProject'
import {projectsSelector} from '../features/projectsSlice'
import {useSelector} from 'react-redux'
import {makeStyles} from '@material-ui/styles'
import {ProjectCard} from '../components/ProjectCard'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}))

export const Projects: React.FC = (): ReactElement => {
    const classes = useStyles()
    const [modalShow, setModalShow] = useState<boolean>(false)
    const projects = useSelector(projectsSelector)


    const handleModalClose = (): void => {
        setModalShow(false)
    }

    const handleModalOpen = (): void => {
        setModalShow(true)
    }

    return <>
        <Box className={classes.root}>
            <h1>Projects:</h1>
            <Button onClick={handleModalOpen} variant="contained" color="primary">Add project</Button>
        </Box>
        <CustomModal isOpen={modalShow} onClose={handleModalClose}>
            <AddProject onCloseModal={handleModalClose}/>
        </CustomModal>
        <Grid container spacing={3}>
            {projects && projects.map((project) => {
                return (
                    <Grid item xs={12} md={6} lg={3} key={project.id}>
                        <ProjectCard projectTitle={project.projectTitle}
                                     projectAdmin={project.projectAdmin}
                                     projectManager={project.projectManager}
                                     dateEnd={project.dateEnd}
                                     dateStart={project.dateStart}
                        />
                    </Grid>
                )
            })}
        </Grid>
    </>
}
