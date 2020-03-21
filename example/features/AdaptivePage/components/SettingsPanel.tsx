import React, { useMemo, useState } from 'react'
import { Box, Drawer, Tab, Tabs } from '@material-ui/core'

import { SettingsBlock } from '@features/AdaptivePage/components/SettingsBlock'
import { IWithAdaptiveSettingsState } from '@features/AdaptivePage/hoc/withAdaptiveSettingsState'
import { AdaptiveValueTypes } from '@features/AdaptivePage/enums/AdaptiveValueTypes'

interface IProps {
    open: boolean
    onClose: () => void
}

export const SettingsPanel: React.FC<IProps & IWithAdaptiveSettingsState> = ({
    open,
    onClose,
    settings,
    setValue,
    deleteItem,
}) => {
    const [tab, setTab] = useState<number>(0)
    const adaptiveValueTypes = useMemo(() => (
        Object.keys(settings) as AdaptiveValueTypes[]
    ), [settings])


    const TabPanel = ({ panelIndex }: { panelIndex: number }) => {
        const currentType = adaptiveValueTypes.filter((_, index) => index === panelIndex)[0]

        return (
            <SettingsBlock
                items={settings[currentType]}
                onSubmit={item => setValue(currentType, item)}
                onRemove={id => deleteItem(currentType, id)}
            />
        )
    }

    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={onClose}
        >
            <Box p={2}>
                <Tabs value={tab} onChange={(event, value: number) => setTab(value)}>
                    {adaptiveValueTypes.map((type) => (
                        <Tab
                            key={type}
                            label={type}
                            disableFocusRipple={true}
                        />
                    ))}
                </Tabs>

                <TabPanel panelIndex={tab}/>
            </Box>
        </Drawer>
    )
}
