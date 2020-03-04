import React, { useState } from 'react'

import { ExpandableGrid } from '../lib/Expandable'
import './style.css'


export const App: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>()
    const [columnsCount, setColumnsCount] = useState<number>(3)

    const adaptive = {
        heights: [
            {windowWidth: {min: 0, max: 320}, height: 100},
            {windowWidth: {min: 321, max: 768}, height: 150},
            {windowWidth: {min: 769, max: 1020}, height: 200},
            {windowWidth: {min: 1025, max: 1280}, height: 300}
        ],
        columnsCounts: [
            {windowWidth: {min: 0, max: 320}, columnsCount: 1},
            {windowWidth: {min: 321, max: 768}, columnsCount: 2},
            {windowWidth: {min: 769, max: 1024}, columnsCount: 3},
            {windowWidth: {min: 1025, max: 1280}, columnsCount: 4}
        ]
    }

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
            <ExpandableGrid
                expandedItem={expandedItem}
                itemHeight={200}
                // adaptive={adaptive}
                columnsCount={columnsCount}
                afterExpandedItemChanged={item => {
                    console.log('here')
                    setExpandedItem(item)
                }}
            >
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

            <div className='control-panel'>
                <div
                    className="waves-effect waves-light btn"
                    onClick={() => setExpandedItem(null)}
                >
                    Collapse
                </div>

                <div
                    className="waves-effect waves-light btn"
                    onClick={() => setColumnsCount(columnsCount + 1)}
                >
                    Columns Count Increase +
                </div>

                <div
                    className={`waves-effect waves-light btn ${columnsCount <= 1 ? 'disabled' : ''}`}
                    onClick={() => setColumnsCount(columnsCount - 1)}
                >
                    Columns Count Decrease -
                </div>
            </div>
        </React.Fragment>
    )
}
