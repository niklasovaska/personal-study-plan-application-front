/* eslint-disable */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField';
import courseService from '../services/courses'
import Swal from 'sweetalert2'
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

const AddCourseModal = ({ courses, setCourses, openModal, handleClose }) => {


    const [form, setForm] = useState({
        name: '',
        code: '',
        credits: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleAdd = (e) => {
        e.preventDefault()

        const newCourse = {
            ...form,
            credits: parseInt(form.credits),
            status: 'upcoming'
        }

        courseService
            .create(newCourse)
            .then(res => {
                setCourses(courses.concat(res.data))
            })

        handleClose()

        Swal.fire({
            theme: 'dark',
            icon: 'success',
            title: 'Success!',
            text: 'New course added',
            showConfirmButton: false,
            timer: 3000
        })

        setForm({ name: '', code: '', credits: ''})
    }

    return(
        <>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new course
                    </Typography>
                    <Box 
                        component='form' 
                        noValidate 
                        autoComplete='off' 
                        sx={{mt: 5, display: 'flex', flexDirection: 'column', gap: 3}}
                        onSubmit={handleAdd}
                        >
                        <TextField label='Name' name='name' color='secondary' onChange={handleChange} required/>
                        <TextField label='Code' name='code' color='secondary' onChange={handleChange} required/>
                        <TextField label='Credits' name='credits' type='number' color='secondary' onChange={handleChange} required/>
                        <Button type='submit' variant='contained' color='secondary'>
                            Add
                        </Button>
                        <Button onClick={handleClose} variant='outlined' color='secondary'>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default AddCourseModal