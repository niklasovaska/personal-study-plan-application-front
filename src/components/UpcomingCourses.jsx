/* eslint-disable */
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import SemesterColumn from './SemesterColumn'
import courseService from '../services/courses'
import { useState } from 'react'

const UpcomingCourses = ({ courses, setCourses}) => {

    const [showDropArea, setShowDropArea] = useState(false)
    const [draggedCourseId, setDraggedCourseId] = useState(null)

    const onDrag = (e, id) => {
        console.log(`Card ${id} is being dragged`)
        setDraggedCourseId(id)
    }

    const handleOnDrop = (e, status) => {
        console.log(`Card ${draggedCourseId} dropped on ${status}`)
        setShowDropArea(false)

        const course = courses.find(c => c.id === draggedCourseId)
        const changedCourse = {...course, status: status}

        courseService
            .update(draggedCourseId, changedCourse)
            .then(res => {
                setCourses(courses.map(c => c.id === draggedCourseId ? res.data : c))
            })

        setDraggedCourseId(null)
    }


    return(
        <Box sx={{flexGrow: 1, padding: 8}}>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <SemesterColumn
                            title='Unscheduled'
                            courses={courses}
                            setCourses={setCourses}
                            handleOnDrop={handleOnDrop}
                            onDrag={onDrag}
                            showDropArea={showDropArea}
                            setShowDropArea={setShowDropArea}
                            status='upcoming'
                        />
                </Grid>
                <Grid size={3}>
                    <SemesterColumn
                            title='Spring 2025'
                            courses={courses}
                            setCourses={setCourses}
                            handleOnDrop={handleOnDrop}
                            onDrag={onDrag}
                            showDropArea={showDropArea}
                            setShowDropArea={setShowDropArea}
                            status='S25'
                        />
                </Grid>
                <Grid size={3}>
                    <SemesterColumn
                            title='Autumn 2025'
                            courses={courses}
                            setCourses={setCourses}
                            handleOnDrop={handleOnDrop}
                            onDrag={onDrag}
                            showDropArea={showDropArea}
                            setShowDropArea={setShowDropArea}
                            status='A25'
                        />
                </Grid>
                <Grid size={3}>
                    <SemesterColumn
                            title='Spring 2026'
                            courses={courses}
                            setCourses={setCourses}
                            handleOnDrop={handleOnDrop}
                            onDrag={onDrag}
                            showDropArea={showDropArea}
                            setShowDropArea={setShowDropArea}
                            status='S26'
                        />
                </Grid>
            </Grid>
        </Box>
    )
}

export default UpcomingCourses