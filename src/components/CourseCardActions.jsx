import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import courseService from '../services/courses'
import Swal from 'sweetalert2'
import { useState } from 'react'


const CourseCardForm = ({courses, setCourses, id }) => {

    const [grade, setGrade] = useState('')

    const handleChange = (e) => {
        setGrade(e.target.value)
    }

    const handleComplete = (e) => {
        e.preventDefault()

        const course = courses.find(c => c.id === id)
        const changedCourse = {...course, grade: grade, status: 'completed'}

        courseService
            .update(id, changedCourse).then(returnedCourse => {
                const coursesUpdated = courses.map(course => course.id === id ? returnedCourse.data : course)
                setCourses(coursesUpdated)
            })
            .catch(error => {
                console.log(error)
                alert(
                    `The course ${course.name} was already deleted from server`
                )
                setCourses(courses.filter(c => c.id !== id))
            })

            Swal.fire({
                theme: 'dark',
                icon: 'success',
                title: 'Success!',
                text: 'Course completed!',
                showConfirmButton: false,
                timer: 3000
            })
    }


    return(
        
        <Box 
            component='form' 
            noValidate 
            autoComplete='off'
            onSubmit={handleComplete}
            sx={{mt: 5, display: 'flex', flexDirection: 'column', gap: 2}}
            >
            <FormControl fullWidth>
                <InputLabel id='grade' color='secondary'>Grade</InputLabel>
                <Select
                    labelId='grade_select'
                    id='grade'
                    value={grade}
                    label='Grade'
                    onChange={handleChange}
                    color='secondary'
                    >
                    <MenuItem value={"pass"}>Pass</MenuItem>
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                </Select>
            </FormControl>
            <Button type='submit' variant='contained' color='secondary'>
                Complete
            </Button>
            <Button variant='outlined' color='secondary'>
                Cancel
            </Button>
        </Box>
    )
}


const CourseCardActions = ({ courses, setCourses, id }) => {

    const [isCompleting, setIsCompleting] = useState(false)

    const handleDelete = () => {
        courseService
            .deleteCourse(id).then(returnedCourse => {
                console.log(returnedCourse)
                setCourses(courses.filter(course => course.id !== id))
            })
            .catch(error => {
                console.log(error)
                alert(
                    `The course ${id} was already deleted from server`
                )
                setCourses(courses.filter(c => c.id !== id))
            })

            Swal.fire({
                theme: 'dark',
                icon: 'success',
                title: 'Success!',
                text: 'Course has been removed',
                showConfirmButton: false,
                timer: 3000
            })
    }

    return(
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component='span'>Actions</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <Tooltip title='Mark complete'>
                        <IconButton onClick={() => setIsCompleting(true)}><CheckCircleOutlineIcon /></IconButton>
                    </Tooltip>
                    <Tooltip title='Delete course'>
                    <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
                    </Tooltip>
                </Box>
                {isCompleting && <CourseCardForm courses={courses} setCourses={setCourses} id={id}/>}
            </AccordionDetails>
        </Accordion>
    )
}

export default CourseCardActions