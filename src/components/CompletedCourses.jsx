/* eslint-disable */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const CompletedCourses = ({ courses }) => {

    const completedCourses = courses.filter((course) => course.status === "completed")

    return(
        <TableContainer component={Paper} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Table sx={{maxWidth: 1200, mt: 10}}>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Course name</strong></TableCell>
                        <TableCell align='center'><strong>Grade</strong></TableCell>
                        <TableCell align='center'><strong>Credits</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {completedCourses.map(course => 
                        <TableRow key={course.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{course.name}</TableCell>
                            <TableCell align='center'>{course.grade}</TableCell>
                            <TableCell align='center'>{course.credits}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CompletedCourses