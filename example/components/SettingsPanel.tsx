import React, { useEffect, useState } from 'react'
import { Box, Drawer, Tab, Tabs } from '@material-ui/core'

import { AdaptiveForm } from './AdaptiveForm'
import { deleteHeightAC, setHeightAC, useAdaptiveSettingsState } from '../hooks/useAdaptiveSettingsState'
import { IAdaptiveSettings } from '../interfaces/IAdaptiveSettings'

interface IProps {
    open: boolean
    onClose: () => void
    onSettingsChange: (settings: IAdaptiveSettings) => void
}

export const SettingsPanel: React.FC<IProps> = ({
    open,
    onClose,
    onSettingsChange
}) => {
    const { settings, dispatch } = useAdaptiveSettingsState()
    const [tab, setTab] = useState<number>(0)

    useEffect(() => {
        onSettingsChange(settings)
    }, [settings])

    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={onClose}
        >
            <Box p={2}>
                <Tabs value={tab}>
                    <Tab
                        label='Height'
                        disableFocusRipple={true}
                    />
                </Tabs>
                <AdaptiveForm
                    items={settings.heights}
                    onSubmit={item => dispatch(setHeightAC(item))}
                    onRemove={id => dispatch(deleteHeightAC(id))}
                />
            </Box>
        </Drawer>
    )
}
