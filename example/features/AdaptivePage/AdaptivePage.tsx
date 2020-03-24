import React, { useMemo, useState } from 'react'

import { ExpandableGrid } from '@lib/Expandable'

import { getItems } from '@common/utils/items'
import { ExampleItem } from '@common/components/ExampleItem/ExampleItem'
import { FloatingButton } from '@common/components/FloatingButton/FloatingButton'

import { SettingsPanel } from '@features/AdaptivePage/components/SettingsPanel'
import {
    IWithAdaptiveSettingsState,
    withAdaptiveSettingsState,
} from '@features/AdaptivePage/hoc/withAdaptiveSettingsState'

const AdaptivePageComponent: React.FC<IWithAdaptiveSettingsState> = ({
    settings,
    setValue,
    deleteItem
}) => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null)
    const [panelOpen, setPanelOpen] = useState(true)
    const items = useMemo(() => getItems(), [])

    return (
        <>
            <ExpandableGrid
                expandedItem={expandedItem}
                adaptive={settings}
                afterColumnsCountChanged={() => setExpandedItem(null)}
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
                settings={settings}
                setValue={setValue}
                deleteItem={deleteItem}
            />

            <FloatingButton onClick={() => setPanelOpen(true)}/>
        </>
    )
}

export const AdaptivePage = withAdaptiveSettingsState(AdaptivePageComponent)
