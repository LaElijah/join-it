
import { useMediaQuery } from '@mantine/hooks'
import { useCallback } from 'react'
import Cropper from 'react-easy-crop'
import styles from '@/app/styles/elements/cropModal.module.scss'
import { Modal, Slider, Button } from '@mantine/core'
import { getCroppedImg } from '@/app/_utils/images/imageUtils'


export default function CropModal(props: any) {

    const {state, dispatch } = props

    const { formDispatch } = props

    const isMobile = useMediaQuery("(max-width: 50em)");

    const handleCropComplete = useCallback((croppedArea: number, croppedAreaPixels: number) => {
        dispatch({ name: "croppedAreaPixels", value: croppedAreaPixels })
        
    }, [])

    const handleCropSubmit = useCallback(async () => {

        const croppedImage = await getCroppedImg(
            state.imageURL,
            state.croppedAreaPixels,
            state.rotation
        )
       
        dispatch({ name: "croppedImage", value: croppedImage })
        dispatch({ name: "opened", value: false })
        
        formDispatch({ name: "croppedImage", value: croppedImage })


    }, [state.croppedAreaPixels, state.rotation])


    return (
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
                                // className={styles.cropperElement}
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
                                cropShape="rect"
                                showGrid={true}
                                rotation={state.rotation}
                                onRotationChange={(event) => {
                                    dispatch({ name: "rotation", value: event })
                                }}

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
                            onChange={(event) => {
                                dispatch({ name: "zoom", value: event })
                            }}
                            
                        />
                        <Slider
                            className={styles.slider}

                            value={state.rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="Rotation"
                            onChange={(event) => {
                                dispatch({ name: "rotation", value: event })
                            }}

                        />
                        <Button onClick={handleCropSubmit} >Show Result</Button>

                    </div>
                </div>
            </Modal>
    )
}