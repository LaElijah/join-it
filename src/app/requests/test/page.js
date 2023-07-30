"use client"

import { useReducer, useCallback } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import Cropper from 'react-easy-crop'
import styles from './page.module.scss'
import { Modal, Slider, Button } from '@mantine/core'
import Image from 'next/image'

import { getCroppedImg, getRotatedImage } from './cropImage'

export default function UploadFormPage(props) {
    function readFile(file) {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.addEventListener('load', () => resolve(reader.result), false)
          reader.readAsDataURL(file)
        })
      }

      
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

   const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        dispatch({ name: "croppedAreaPixels", value: croppedAreaPixels })
        
    }, [])

    



const urlToFile = async (url, filename) => {
    const blob = await (await fetch(url)).blob()
    return new File([blob], filename, { type: "image/png" })

}

    const uploadToServer = async (event) => {
        const body = new FormData();
        const file = await urlToFile(state.croppedImage, "croppedImage.png");
        body.append("file", file);
        const response = await fetch("/api/images", {
            method: "POST",
            body
        });
    };

    const handleZoomChange = (zoom) => {
        dispatch({ name: "zoom", value: zoom })
    }

    const handleRotationChange = (rotation) => {
        dispatch({ name: "rotation", value: rotation })
    }


    const isMobile = useMediaQuery("(max-width: 50em)");

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
    


    const handleCropSubmit = useCallback(async (event) => {

        const croppedImage = await getCroppedImg(
            state.imageURL,
            state.croppedAreaPixels,
            state.rotation
        )
       

        dispatch({ name: "croppedImage", value: croppedImage })
        dispatch({ name: "opened", value: false })
    }, [state.croppedAreaPixels, state.rotation])








    return (
        <div>
            <Modal
                fullScreen={isMobile}
                size="lg"
                opened={state.opened}
                onClose={() => {
                    dispatch({
                        name: "opened",
                        value: false
                    })
                }}
            >
                <div className={styles.modal}>
                    <div className={styles.cropperWrapper}>
                        <div className={styles.cropper}>
                            <Cropper
                                className={styles.cropperElement}
                                image={state.imageURL}
                                crop={state.crop}
                                zoom={state.zoom}
                                aspect={1}
                                onCropChange={(event) => {
                                    dispatch({ name: "crop", value: event })
                                   
                                }}
                                onCropComplete={handleCropComplete}
                                onZoomChange={(event) => {
                                    dispatch({ name: "zoom", value: event })
                                }}
                                cropShape="square"
                                showGrid={true}
                                rotation={state.rotation}
                                onRotationChange={handleRotationChange}

                            />

                        </div>
                    </div>
                    <div className={styles.controls}>
                        <Slider
                            className={styles.slider}
                            value={state.zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={handleZoomChange}
                            classes={{ root: styles.slider }}
                        />
                        <Slider
                            className={styles.slider}

                            value={state.rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="Rotation"
                            onChange={handleRotationChange}

                        />
                        <Button onClick={handleCropSubmit} >Show Result</Button>

                    </div>
                </div>
            </Modal>

            <Image
                src={state.croppedImage || "/png.png"}
                alt="Cropped image preview"
                height={64}
                width={64}
            />

            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadToServer}>Upload</button>

        </div>
    )
}