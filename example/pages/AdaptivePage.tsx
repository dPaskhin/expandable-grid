import React, { useMemo, useState } from 'react'

import { ExpandableGrid } from '../../lib/Expandable'
import { getItems } from '../utils/items'
import { ExampleItem } from '../components/ExampleItem'
import { FloatingButton } from '../components/FloatingButton'
import { DialogModal } from '../components/DialogModal'
import { useFormAdaptiveState } from '../hooks/useAdaptiveFormState'
import { AdaptiveForm } from '../components/AdaptiveForm'


export const AdaptivePage: React.FC = () => {
    const [expandedItem, setExpandedItem] = useState<number | null>(null)
    const [isDialogModalOpen, setIsDialogModalOpen] = useState(false)
    const items = useMemo(() => getItems(), [])
    const { state, dispatch } = useFormAdaptiveState()


    return (
        <React.Fragment>
            <DialogModal
                isOpen={isDialogModalOpen}
                onClose={() => setIsDialogModalOpen(false)}
                title='Customize the grid'
                description='Here you can customize the grid. Also you can drag this modal window to see how the grid changes.'
            >
                <AdaptiveForm/>
            </DialogModal>
            <ExpandableGrid
                expandedItem={expandedItem}
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

            <FloatingButton onClick={() => setIsDialogModalOpen(true)}/>
        </React.Fragment>
    )
}
