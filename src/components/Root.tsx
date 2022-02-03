import { Card, Box } from 'degen'
import { ReactElement } from 'react'
import type { BoxProps } from 'degen/dist/types'

export type BoxMaxWidth = BoxProps['maxWidth']

const Root = ({ children, maxWidth = '144' }: { children: ReactElement[] | ReactElement, maxWidth?: BoxMaxWidth }) => {
    return (
        <Box width="full"
            maxWidth={maxWidth}
            style={{ display: 'flex', maxHeight: '100%' }}>
            <Card width='full' padding={"none"} hover>
                <Box display='flex' style={{ height: '100%' }}>
                    {children}
                </Box>
            </Card>
        </Box>
    )
}

export default Root