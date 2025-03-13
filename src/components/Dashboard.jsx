import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const Dashboard = ({ courses }) => {

    const allCredits = courses.reduce((sum, course) => {
        return sum += course.credits
    }, 0)

    const completedCourses = courses.filter((course) => course.status === 'completed')
    const completedCoursesWithGrades = completedCourses.filter((course) => course.grade !== 'pass')

    const completedCredits = completedCourses.reduce((sum, course) => {
        return sum += course.credits
    }, 0)

    const weightedAverage = (arr) => {

        const nom = arr.reduce((sum, c) => sum += c.credits * parseInt(c.grade), 0)
        const denom = arr.reduce((sum, c) => sum += c.credits, 0)
        return (nom / denom).toFixed(2)
    }

    const Section = styled(Paper)(({ theme }) => ({
        width: 300,
        padding: theme.spacing(4),
        textAlign: 'center',
        backgroundColor: '#fff',
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
          })
      }));

    const ProgressChart = (props) => {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress 
                    variant='determinate' {...props} 
                    color='secondary' 
                    size={150}
                    thickness={8}/>
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                  >
                    {`${Math.round(props.value)}%`}
                  </Typography>
                </Box>
            </Box>
          )
    }

    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 4}}>
            <Stack direction={{xs: 'column', lg: 'row'}} spacing={{xs: 5, md: 10 }}>
                <Section>
                    <ProgressChart value={completedCredits / allCredits * 100}/>
                </Section>
                <Section sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2}}>
                    <Typography variant='h4'>Credits</Typography>
                    <Typography variant='h5'>{completedCredits} / {allCredits}</Typography>
                </Section>
                <Section sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2}}>
                    <Typography variant='h4'>GPA</Typography>
                    <Typography variant='h5'>{weightedAverage(completedCoursesWithGrades)}</Typography>
                </Section>
            </Stack>
        </Box>
    )
}

export default Dashboard