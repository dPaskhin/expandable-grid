import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Paper,
    PaperProps
} from '@material-ui/core'
import Draggable from 'react-draggable'

interface IProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
}

export const DialogModal: React.FC<IProps> = ({
    children,
    isOpen,
    onClose,
    title,
    description
}) => {
    const DraggablePaper = (props: PaperProps) => (
        <Draggable
            handle='#draggable-dialog-title'
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props}/>
        </Draggable>
    )

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            PaperComponent={DraggablePaper}
        >
            <DialogTitle
                id='draggable-dialog-title'
                style={{ cursor: 'move' }}
            >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={onClose}
                    color='primary'
                    disableFocusRipple={true}
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}
