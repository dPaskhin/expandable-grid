import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { CSSTransition } from 'react-transition-group'

import { CloseIcon } from './CloseIcon'

interface IProps {
    isExpanded: boolean
    onClose: () => void
}

export const ExampleItem: React.FC<IProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
    isExpanded,
    onClose,
    ...props
}) => (
    <div
        className={`example-item ${isExpanded ? 'example-item--expanded' : ''}`}
        {...props}
    >
        <CSSTransition
            in={isExpanded}
            timeout={300}
            unmountOnExit={true}
            mountOnEnter={true}
        >
            <CloseIcon onClick={event => {
                // You need to add event.propagation if you want to handle a click that closes the expanded block
                event.stopPropagation()
                onClose()
            }}/>
        </CSSTransition>
    </div>
)
