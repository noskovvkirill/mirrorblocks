import { Card, Box } from 'degen'
import { ReactElement } from 'react'

const Root = ({ children, maxWidth = '36rem' }: { children: ReactElement[] | ReactElement, maxWidth?: string }) => {
    return (
        <Box width="full" style={{ maxWidth: maxWidth, display: 'flex', maxHeight: '100%' }}>
            <Card width='full' padding={"none"} hover>
                <Box display='flex' style={{ height: '100%' }}>
                    {children}
                </Box>
            </Card>
        </Box>
    )
}

export default Root