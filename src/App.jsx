import { useEffect, useState } from 'react'
import courseService from './services/courses'
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CompletedCourses from './components/CompletedCourses'
import UpcomingCourses from './components/UpcomingCourses';
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard';
import ToggleSwitch from './components/ToggleSwitch';
import Typography from '@mui/material/Typography';

function App() {

  const [courses, setCourses, error, loading] = useFetch()
  const [mode, setMode] = useState(true)
  const [showUpcoming, setShowUpcoming] = useState(false)

  const theme = createTheme({
    palette: {
      mode: mode ? 'dark' : 'light' 
    },
  })

  if(error) {
    return <Typography>Something went wrong</Typography>
  }

  if(loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar courses={courses} setCourses={setCourses} mode={mode} setMode={setMode}/>
      {error && <Typography>Something went wrong</Typography>}
      <Dashboard courses={courses}/>
      <ToggleSwitch showUpcoming={showUpcoming} setShowUpcoming={setShowUpcoming}/>
      {!showUpcoming && <CompletedCourses courses={courses}/>}
      {showUpcoming && <UpcomingCourses courses={courses} setCourses={setCourses}/>}
    </ThemeProvider>
  )
}

export default App

const useFetch = () => {
  const [courses, setCourses] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setError(false)
      setLoading(true)
      await courseService
        .getAll()
        .then(res => {
          setCourses(res.data)
        })
        .catch(error => {
          console.log(error)
          setError(true)
        })
        setLoading(false)
    })()
  }, [])

  return [courses, setCourses, error, loading]
}