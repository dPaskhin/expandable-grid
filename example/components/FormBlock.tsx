import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core'

import { IMediaValue } from '../interfaces/IMediaValue'

interface IProps {
    onSubmit: (item: IMediaValue) => void
    warnings?: string[]
}

export const FormBlock: React.FC<IProps> = ({
    onSubmit,
    warnings = []
}) => {
    const [value, setValue] = useState<number | null>(null)
    const [min, setMin] = useState<number | null>(null)
    const [max, setMax] = useState<number | null>(null)
    const isValid = (min !== null && min >= 0) && (max !== null && max >= 0) && (value !== null && value >= 0)

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()

        if (!isValid) {
            return
        }

        onSubmit({ windowWidth: { min: min!, max: max! }, value: value! })
        setMin(null)
        setMax(null)
        setValue(null)
    }

    const onChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: 'min' | 'max' | 'value'
    ) => {
        const value = Number(event.target.value)
        const formattedValue = !isNaN(value) ? value : null

        switch (type) {
            case 'min': {
                setMin(formattedValue)
                break
            }
            case 'max': {
                setMax(formattedValue)
                break
            }
            case 'value': {
                setValue(formattedValue)
                break
            }
        }
    }

    return (
        <form
            className='form__block'
            onSubmit={submitHandler}
            noValidate
            autoComplete='off'
        >
            <Box display='flex' p={1}>
                <TextField
                    value={min !== null ? min : ''}
                    label='Window width MIN'
                    fullWidth={true}
                    style={{ paddingRight: '5px' }}
                    onChange={
                        (event) => onChangeHandler(event,'min')
                    }
                />
                <TextField
                    value={max !== null ? max : ''}
                    label='Window width MAX'
                    fullWidth={true}
                    style={{ paddingLeft: '5px' }}
                    onChange={
                        (event) => onChangeHandler(event, 'max')
                    }
                />
            </Box>

            <Box p={1}>
                <TextField
                    value={value !== null ? value : ''}
                    label='Value'
                    fullWidth={true}
                    onChange={
                        (event) => onChangeHandler(event, 'value')
                    }
                />
            </Box>

            <Box p={1}>
                <Button
                    type='submit'
                    variant='outlined'
                    fullWidth={true}
                    disableFocusRipple={true}
                    disabled={!isValid}
                >
                    Submit
                </Button>

                {warnings?.map((warning, index) => (
                    <Box key={index}>
                        <Typography
                            color='error'
                            variant='caption'
                        >
                            {warning}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </form>
    )
}
