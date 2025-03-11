/* eslint-disable */
import { useEffect, useState } from 'react'
import courseService from './services/courses'
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CompletedCourses from './components/CompletedCourses'
import UpcomingCourses from './components/UpcomingCourses';
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard';
import ToggleSwitch from './components/ToggleSwitch';

function App() {

  const [mode, setMode] = useState(true)
  const [courses, setCourses] =  useState([])
  const [showUpcoming, setShowUpcoming] = useState(false)

  useEffect(() => {
    courseService
      .getAll()
      .then(res => {
        setCourses(res.data)
  })
  }, [])


  const theme = createTheme({
    palette: {
      mode: mode ? 'dark' : 'light' 
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar courses={courses} setCourses={setCourses} mode={mode} setMode={setMode}/>
      <Dashboard courses={courses}/>
      <ToggleSwitch showUpcoming={showUpcoming} setShowUpcoming={setShowUpcoming}/>
      {!showUpcoming && <CompletedCourses courses={courses}/>}
      {showUpcoming && <UpcomingCourses courses={courses} setCourses={setCourses}/>}
    </ThemeProvider>
  )
}

export default App
