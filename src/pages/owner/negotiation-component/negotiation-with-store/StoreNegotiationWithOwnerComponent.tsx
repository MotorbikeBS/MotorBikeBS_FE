import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import ListNegotiateMotorByOwner from './list-negotiation-pending/ListNegotiateMotorByOwner'
import AcceptNegotiationComponent from './list-negotiation-accept/AcceptNegotiationComponent'


const StoreNegotiationWithOwnerComponent = () => {
    const [value, setValue] = React.useState<number>(0)
    const handleChangeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }
    return (
        <>

            <Box
                flexGrow={10}
                marginTop='0.5rem'
                marginBottom='5%'
            >
                <Tabs
                    value={value}
                    onChange={handleChangeTabs}
                    indicatorColor='secondary'
                    sx={{
                        ".Mui-selected": {
                            color: `orange`,
                        },
                    }}
                    centered
                >
                    <Tab label='Xe Đang Thương Lượng' />
                    <Tab label='Xe Đã Thương Lượng' />
                </Tabs>
                <Box flexGrow={4} marginTop='3rem'>
                    {value === 0 && <ListNegotiateMotorByOwner />}
                    {value === 1 && <AcceptNegotiationComponent />}
                </Box>
            </Box>


        </>
    )

}

export default StoreNegotiationWithOwnerComponent