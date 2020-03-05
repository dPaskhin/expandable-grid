import React from 'react'

interface IProps {
    onClick: (event: React.MouseEvent) => void
}

export const CloseIcon: React.FC<IProps> = ({
    onClick
}) => (
    <div
        className='example-item__close'
        title='Collapse item'
        onClick={onClick}
    >
        <i className='material-icons'>clear</i>
    </div>
)
