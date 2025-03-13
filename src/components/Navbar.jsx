import { AppBar, Box, Toolbar, Typography } from '@mui/material/'
import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip'
import AddCourseModal from './AddCourseModal';
import { useState } from 'react';


const Navbar = ({ courses, setCourses, mode, setMode }) => {

    const [openModal, setOpenModal] = useState(false)
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return(
        <Box sx={{flexGrow: 1, marginBottom: 10}}>
            <AppBar position='fixed'>
                <Toolbar>
                    <Typography variant='h5' component='div'sx={{marginLeft: 6, fontWeight: 'bold', flexGrow: 1}}>personal study plan</Typography>
                    <Tooltip title='Add new course'>
                        <IconButton onClick={handleOpen}><AddCircleIcon fontSize='large'/></IconButton>
                    </Tooltip>
                    <AddCourseModal openModal={openModal} handleClose={handleClose} courses={courses} setCourses={setCourses}/>
                    <Tooltip title={mode ? 'Toggle light mode' : 'Toggle dark mode'}>
                        <IconButton sx={{mr: 6}}onClick={() => setMode(!mode)}>{mode ? <LightModeIcon fontSize='large'/> : <NightlightRoundIcon />}</IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar