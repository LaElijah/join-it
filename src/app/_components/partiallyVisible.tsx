





"use client"

import { useMediaQuery } from "@mantine/hooks";



export default function PartiallyVisible(
    {
        visibilityRules,
        children
    }:
        {
            visibilityRules?: string[] | string;
            children: JSX.Element;
        }
) {


    const getVisibility = (visibilityRules: string[] | string | undefined) => {



        if (visibilityRules) {


            if (typeof visibilityRules === "string") {
                return (useMediaQuery(`(${visibilityRules})`) ? true : false)

            }

            if (visibilityRules.length < 1) {
                throw new Error("Empty array passed in visibility rules")
            }

            if (visibilityRules.length === 1) {
                return (useMediaQuery(visibilityRules[0]) ? true : false)
            }

            let validity: boolean[] = []

            visibilityRules.forEach(rule => {

                if (useMediaQuery(`(${rule})`)) {
                    validity.push(true)
                } else {
                    validity.push(false)
                }

            });

            return !validity.includes(false)
        }
        else {
            throw new Error("Didn't get visibility rules, did you pass it as an argument?")
        }

    }



   
    let isVisible
    if (visibilityRules) {
        const extendedVisibility = getVisibility(visibilityRules)
        isVisible = extendedVisibility
    } else {
        isVisible = useMediaQuery(`(max-width: 424px)`)
    }

    

    if (isVisible) {
        return (
            <>
                {children}
            </>
        )
    }
}