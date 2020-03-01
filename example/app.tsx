import React, { useEffect, useRef, useState } from 'react'

import { ExpandableGrid } from '../lib/Expandable'
import './style.css'


export const App: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>()

    const [throttledValue, setThrottledValue] = useState(expandedItem)
    const lastRan = useRef(Date.now())

    useEffect(
        () => {
            const handler = setTimeout(function () {
                if (Date.now() - lastRan.current >= 600) {
                    setThrottledValue(expandedItem)
                    lastRan.current = Date.now()
                }
            }, 600 - (Date.now() - lastRan.current))

            return () => {
                clearTimeout(handler)
            }
        },
        [expandedItem, 600]
    )

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
            <ExpandableGrid expandedItem={throttledValue}>
                {items.map((i, index) => (
                    <div
                        key={index}
                        className='example-item'
                        style={{ backgroundColor: i }}
                        onClick={() => setExpandedItem(index)}
                    >
                        {throttledValue === index && (
                            <div
                                className='example-item__close'
                                title='Collapse item'
                                onClick={(event: React.MouseEvent) => {
                                    event.stopPropagation()
                                    setExpandedItem(null)
                                }}
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
