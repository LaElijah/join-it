"use client"






import { useMediaQuery } from "@mantine/hooks"



export default function ImageData({children, details}: any) {

    const smallBound = useMediaQuery('(min-width: 512px)')
    const largeBound = useMediaQuery('max-width: 671px')



    return (
        <>
            {children}
            {(smallBound && largeBound) && {details}}
        </>

    )
}