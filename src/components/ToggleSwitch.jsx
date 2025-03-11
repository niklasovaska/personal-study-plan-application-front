/* eslint-disable */
import { Box, Stack, Typography, Switch } from "@mui/material"

const ToggleSwitch = ({ showUpcoming, setShowUpcoming }) => {

    const handleToggleChange = (e) => {
        setShowUpcoming(e.target.checked)
    }


    return(
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10}}>
            <Stack direction={{xs: 'column', sm: 'row'}} spacing={{ xs: 1, sm: 2, md: 4 }} sx={{textAlign: 'center'}}>
                <Typography variant='h5' color={showUpcoming ? 'textDisabled' : 'textPrimary'}>Completed courses</Typography>
                <Switch color='secondary' onChange={handleToggleChange}/>
                <Typography variant='h5' color={showUpcoming ? 'textPrimary' : 'textDisabled'}>Upcoming courses</Typography>
            </Stack>
        </Box>
    )
}

export default ToggleSwitch
