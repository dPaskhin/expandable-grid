import React, { useMemo, useState } from 'react'

import { ExpandableGrid } from '../../lib/Expandable'
import { getItems } from '../utils/items'
import { ExampleItem } from '../components/ExampleItem'
import { FloatingButton } from '../components/FloatingButton'
import { SettingsPanel } from '../components/SettingsPanel'
import { IAdaptiveSettings } from '../interfaces/IAdaptiveSettings'

export const AdaptivePage: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null)
    const [panelOpen, setPanelOpen] = useState(false)
    const items = useMemo(() => getItems(), [])
    const [adaptiveSettings, setAdaptiveSettings] = useState<IAdaptiveSettings | null>(null)

    return (
        <React.Fragment>
            <ExpandableGrid
                expandedItem={expandedItem}
                adaptive={adaptiveSettings}
            >
                {items.map((item, index) => (
                    <ExampleItem
                        key={index}
                        isExpanded={expandedItem === index}
                        onClick={() => setExpandedItem(index)}
                        onClose={() => setExpandedItem(null)}
                        style={{ backgroundColor: item }}
                    />
                ))}
            </ExpandableGrid>


            <SettingsPanel
                open={panelOpen}
                onClose={() => setPanelOpen(false)}
                onSettingsChange={(settings) => setAdaptiveSettings(settings)}
            />

            <FloatingButton onClick={() => setPanelOpen(true)}/>
        </React.Fragment>
    )
}
