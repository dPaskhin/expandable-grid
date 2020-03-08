import React from 'react'
import { Box, TextField, Typography } from '@material-ui/core'


export const AdaptiveForm: React.FC = () => {
    return (
        <form noValidate autoComplete='off'>
            <div className='form__block'>
                <Typography variant='h6'>
                    Heights
                </Typography>
                <Box>
                    <Typography variant='subtitle2'>
                        Window width range (You need to fill range from small to big)
                    </Typography>
                    <Box>
                        <TextField label='From' fullWidth={true}/>
                    </Box>
                    <Box>
                        <TextField label='To' fullWidth={true}/>
                    </Box>
                </Box>

                <Box>
                    <TextField label='Item height' fullWidth={true}/>
                </Box>
            </div>
        </form>
    )
}
