import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

import { IMediaValue } from '../interfaces/IMediaValue'

interface IProps {
    items: Readonly<IMediaValue[]>
    onRemove: (id: number) => void
}

export const FormTable: React.FC<IProps> = ({
    items,
    onRemove
}) => (
    <TableContainer>
        <Table size='small'>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Min
                    </TableCell>
                    <TableCell>
                        Max
                    </TableCell>
                    <TableCell>
                        Value
                    </TableCell>
                    <TableCell align='right'>
                        Remove
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4}>
                            <Typography variant='subtitle1'>
                                No media queries yet
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            {item.windowWidth.min}
                        </TableCell>

                        <TableCell>
                            {item.windowWidth.max}
                        </TableCell>

                        <TableCell>
                            {item.value}
                        </TableCell>

                        <TableCell align='right'>
                            <Close
                                style={{ cursor: 'pointer' }}
                                onClick={() => onRemove(item.id!)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
)
