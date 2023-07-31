"use client"

import { useReducer } from 'react'

import Image from 'next/image'
// import { getCroppedImg, getRotatedImage } from '../../../utils/images/imageUtils'
import {  readFile } from '../../../../../utils/images/imageUtils'
import CropModal from './cropModal'
import styles from './uploadFile.module.scss'
import { Stack } from '@mui/material'
import FileUploaderButton from './fileUploaderButton'

export default function FileUploader() {
   

      
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

    const uploadToServer = async () => {
        const body = new FormData();
        console.log(state.croppedImage)
        const file =  await urlToFile(state.croppedImage, "croppedImage.png");
        body.append("file", file);
        console.log(body)
        console.log(file)
        const response = await fetch("/api/images", {
            method: "POST",
            body
        });
        const data = await response.json();
        console.log(data)
    };

   

    const handleFileChange = async (event) => { if (event.target.files && event.target.files.length > 0) {
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
        <Stack className={styles.container} direction={"column"} spacing={2}>
            


           



<Stack className={styles.sharedInput} direction={"row"} spacing={2}>
<CropModal 
                state={state}
                dispatch={dispatch}
            />
            <Image
                className={styles.imagePreview}
                src={state.croppedImage || "/png.png"}
                alt="Cropped image preview"
                height={64}
                width={64}
            />

            

            <FileUploaderButton handleFileChange={handleFileChange} /> 
           

        </Stack>
        <button onClick={uploadToServer}>Upload</button>
        </Stack>
    )
}