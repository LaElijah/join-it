
import { useMediaQuery } from '@mantine/hooks'
import { useCallback } from 'react'
import Cropper from 'react-easy-crop'
import styles from './cropModal.module.scss'
import { Modal, Slider, Button } from '@mantine/core'
import { getCroppedImg } from '@/utils/images/imageUtils'


export default function CropModal(props) {

    const {state, dispatch } = props

    const isMobile = useMediaQuery("(max-width: 50em)");

    const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        dispatch({ name: "croppedAreaPixels", value: croppedAreaPixels })
        
    }, [])

    const handleCropSubmit = useCallback(async () => {

        const croppedImage = await getCroppedImg(
            state.imageURL,
            state.croppedAreaPixels,
            state.rotation
        )
        console.log(croppedImage)
       
        dispatch({ name: "croppedImage", value: croppedImage })
        dispatch({ name: "opened", value: false })
        const file = await props.urlToFile(state.croppedImage, "croppedImage.png");
        props.formDispatch({ name: "image", value: file })


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
                            classes={{ root: styles.slider }}
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