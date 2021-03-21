import React, {ReactElement} from 'react'
import {Controller, useForm} from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import {Box, Button, Theme} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import {addNewProject, Project} from '../features/projectsSlice'
import {useDispatch, useSelector} from 'react-redux'
import {isLoadingSelector} from '../features/projectsSlice'
import {formatDate} from '../helpers'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiTypography-root': {
            marginBottom: theme.spacing(3)
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3),
        },
        '& .MuiButtonBase-root': {
            padding: '16px 16px',
            marginBottom: theme.spacing(1),
        },
        '& .MuiBox-root': {
            display: 'flex',
            alignItems: 'baseline',
            '& .MuiTypography-root': {
                marginRight: theme.spacing(1)
            }
        }
    }
}))

interface AddProjectProps {
    onCloseModal: () => void
}

interface Inputs {
    projectTitle: string
    dateStart: string
    dateEnd: string
    projectManager: string
    projectAdmin: string
}

export const AddProject: React.FC<AddProjectProps> = ({onCloseModal}): ReactElement => {
    const classes = useStyles()
    const {handleSubmit, errors: fieldsErrors, control} = useForm<Inputs>()
    const dispatch = useDispatch()
    const isLoading = useSelector(isLoadingSelector)

    const onSubmit = (data: Project): void => {
        const {dateStart, dateEnd} = data
        dispatch(addNewProject({
            ...data,
            dateStart: formatDate(dateStart),
            dateEnd: formatDate(dateEnd),
        }))
        onCloseModal()
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h5" gutterBottom>New project</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <Controller
                    name="projectTitle"
                    as={
                        <TextField
                            id="projectTitle"
                            helperText={fieldsErrors.projectTitle ? fieldsErrors.projectTitle.message : null}
                            variant="outlined"
                            label="Name"
                            error={Boolean(fieldsErrors.projectTitle)}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Field is required',
                    }}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Controller
                        name="dateStart"
                        control={control}
                        defaultValue={new Date()}
                        rules={{
                            required: 'Field is required',
                        }}
                        render={({onChange, value}) => (
                            <KeyboardDatePicker
                                value={value}
                                onChange={onChange}
                                variant="inline"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="start-project-date"
                                label="Start project date"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        )}
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Controller
                        name="dateEnd"
                        control={control}
                        defaultValue={new Date()}
                        rules={{
                            required: 'Field is required',
                        }}
                        render={({onChange, value}) => (
                            <KeyboardDatePicker
                                variant="inline"
                                inputVariant="outlined"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="end-project-date"
                                label="End project date"
                                value={value}
                                onChange={onChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        )}
                    />
                </MuiPickersUtilsProvider>
                <Controller
                    name="projectManager"
                    as={
                        <TextField
                            id="projectManager"
                            helperText={fieldsErrors.projectManager ? fieldsErrors.projectManager.message : null}
                            variant="outlined"
                            label="Project manager"
                            error={Boolean(fieldsErrors.projectManager)}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Field is required',
                    }}
                />
                <Controller
                    name="projectAdmin"
                    as={
                        <TextField
                            id="projectAdmin"
                            helperText={fieldsErrors.projectAdmin ? fieldsErrors.projectAdmin.message : null}
                            variant="outlined"
                            label="Project admin"
                            error={Boolean(fieldsErrors.projectAdmin)}
                        />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Field is required',
                    }}
                />
                <Button type='submit' variant="contained" color="primary" disabled={isLoading}>ADD</Button>
            </form>
        </Box>
    )
}
