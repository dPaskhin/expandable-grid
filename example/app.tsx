import React, { useState } from 'react'

import { ExpandableGrid } from '../lib/Expandable'
import './style.css'


export const App: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>()

    const items = [
        '#68ecb2',
        '#187dfa',
        '#852542',
        '#449221',
        '#7943c5',
        '#522c09'
    ]

    return (
        <React.Fragment>
            <ExpandableGrid expandedItem={expandedItem}>
                {items.map((i, index) => (
                    <div
                        key={index}
                        className='example-item'
                        style={{ backgroundColor: i }}
                        onClick={() => setExpandedItem(index)}
                    >
                        {expandedItem === index && (
                            <div
                                className='example-item__close'
                                title='Collapse item'
                                onClick={() => setExpandedItem(null)}
                            >
                                <i className='material-icons'>clear</i>
                            </div>
                        )}
                    </div>
                ))}
            </ExpandableGrid>

            <div
                className="waves-effect waves-light btn"
                onClick={() => setExpandedItem(null)}
            >
                Collapse
            </div>
        </React.Fragment>
    )
}
