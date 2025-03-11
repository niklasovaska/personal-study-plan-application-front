/* eslint-disable */
import Paper from '@mui/material/Paper'
import CourseCard from './CourseCard'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const SemesterColumn = ({ title, courses, setCourses, handleOnDrop, onDrag, showDropArea, setShowDropArea, status }) => {

    const SemesterTitle = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(4),
        textAlign: 'center',
        borderRadius: 4,
        backgroundColor: '#fff',
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
          }),
      }));


    const semesterTitleStyle = {
        padding: 4,
        textAlign: 'center',
        borderRadius: 4,
        bgcolor: 'secondary.dark'
    }
   
    const semesterCourses = courses.filter((course) => course.status === status)

    return(
        <>
            <SemesterTitle ><Typography sx={{typography: {xs: 'body2', sm: 'body1', md: 'h6'}}}>{title}</Typography></SemesterTitle>
            {semesterCourses.map(course => <CourseCard 
                key={course.id}
                name={course.name} 
                id={course.id} 
                credits={course.credits} 
                courses={courses}
                setCourses={setCourses}
                handleOnDrop={handleOnDrop}
                onDragStart={onDrag}
                showDropArea={showDropArea}
                setShowDropArea={setShowDropArea}
                status={status}
                />)
            }
        </>
    )
}

export default SemesterColumn