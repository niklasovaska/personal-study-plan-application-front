import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CourseCardActions from './CourseCardActions'
import './CourseCard.css'
import { useState } from 'react'


const CourseCard = ({ name, id, credits, courses, setCourses, handleOnDrop, onDragStart, showDropArea, setShowDropArea, status }) => {
    
    const [hover, setHover] = useState(false)

    const handleDragOver = (e) => {
        e.preventDefault()
        console.log(`Dragged over`)
    }

    const CardItem = ({ title, subtitle, courses, setCourses, id, bgcolor }) => {
        return(
            <Card onMouseOver={() => setHover(true) } onMouseLeave={() => setHover(false)} sx={{bgcolor: bgcolor}}>
                <CardContent>
                    <Typography sx={{typography: {xs: 'body2', sm: 'body1', md: 'h6'}}}>{title}</Typography>
                    <Typography color='text.secondary'>{subtitle}</Typography>
                </CardContent>
                {hover && <CourseCardActions courses={courses} setCourses={setCourses} id={id} />}
            </Card> 
        )
    }

    return(
        <>
            <div 
                draggable
                className='course_card'
                onDragStart={(e) => onDragStart(e, id)}
                onDragEnd={() => setShowDropArea(false)}
                onDragEnter={() => setShowDropArea(true)}>
                <CardItem 
                    title={name} 
                    subtitle={`${credits} credits`}
                    courses={courses} 
                    setCourses={setCourses} 
                    id={id} />
            </div>
            {showDropArea && 
                <div
                    className='drop_area'
                    onDrop={(e) => handleOnDrop(e, status)} 
                    onDragOver={handleDragOver}>
                    <CardItem 
                        title='Drop' 
                        subtitle='Schedule here'
                        bgcolor='#757575'
                        />
                </div>}
        </>
    ) 
}

export default CourseCard