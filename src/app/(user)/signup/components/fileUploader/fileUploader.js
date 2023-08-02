"use client"

import { useReducer } from 'react'

import Image from 'next/image'
// import { getCroppedImg, getRotatedImage } from '../../../utils/images/imageUtils'
import { readFile } from '@/app/_utils/images/imageUtils'
import CropModal from './cropModal'
import styles from './fileUploader.module.scss'
import { Stack } from '@mui/material'
import FileUploaderButton from './fileUploaderButton'

export default function FileUploader(props) {



    const reducer = (state, dispatch) => {
        return {
            ...state,
            [dispatch.name]: dispatch.value
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        crop: { x: 0, y: 0 },
        zoom: 1,
        rotation: 0,
        croppedAreaPixels: null,
        croppedImage: null,
        imageURL: null,
        image: null,
        opened: false

    })




    const urlToFile = async (url, filename) => {
        const blob = await (await fetch(url)).blob()
        return new File([blob], filename, { type: "image/png" })

    }

    // const prepForForm = async () => {
    //     const body = new FormData();
    //     const file = await urlToFile(state.croppedImage, "croppedImage.png");
    //     props.dispatch({ name: "image", value: file })

    // };



    const handleFileChange = async (event) => {
        props.dispatch({ name: "submit", value: "Submit" })
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            let imageDataUrl = await readFile(file)

            dispatch({ name: "imageURL", value: imageDataUrl })
            dispatch({ name: "image", value: file })
            dispatch({ name: "opened", value: true })
        } else {
            dispatch({ name: "imageURL", value: null })
            dispatch({ name: "image", value: null })
        }

    }


    return (
        <div className={styles.container} >







            <Stack className={styles.sharedInput} direction={"row"} spacing={2}>
               
            <Image
                    className={styles.imagePreview}
                    src={state.croppedImage || "/placeholder.png"}
                    alt="Cropped image preview"
                    height={64}
                    width={64}
                />
                
            <FileUploaderButton handleFileChange={handleFileChange} />

                <CropModal
                    state={state}
                    dispatch={dispatch}
                    formDispatch={props.dispatch}
                    urlToFile={urlToFile}
                />
                <Stack className={styles.image} direction={"column"} spacing={2}>
               

                </Stack>


                

            </Stack>
            {/* <button onClick={prepForForm}>Upload</button> */}
        </div>
    )
}