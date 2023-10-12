"use client";

import { useReducer } from "react";
import Image from "next/image";
import { readFile, urlToFile } from "@/app/_utils/images/imageUtils";
import CropModal from "./elements/cropModal";
import styles from "@/app/_styles/components/fileUploader.module.scss";
import FileUploaderButton from "./elements/fileUploaderButton";
import { Stack } from "@mui/material";

interface Props {
  width: number;
  height: number;
  dispatch: any;
  label?: string;
}

export default function FileUploader(props: Props) {
  const reducer = (state: any, dispatch: any) => {
    return {
      ...state,
      [dispatch.name]: dispatch.value,
    };
  };

  const [state, dispatch] = useReducer(reducer, {
    crop: { x: 0, y: 0 },
    zoom: 1,
    rotation: 0,
    croppedAreaPixels: null,
    croppedImage: null,
    imageURL: null,
    image: null,
    opened: false,
  });

  const { width, height, dispatch: parentDispatch, label } = props;

  const handleFileChange = async (event: any) => {
    parentDispatch({ name: "submit", value: "Submit" });
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      let imageDataUrl = await readFile(file);

      dispatch({ name: "imageURL", value: imageDataUrl });
      dispatch({ name: "image", value: file });
      dispatch({ name: "opened", value: true });
    } else {
      dispatch({ name: "imageURL", value: null });
      dispatch({ name: "image", value: null });
    }
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <Stack className={styles.sharedInput} direction={"row"} spacing={2}>
        <Image
          className={styles.imagePreview}
          src={state.croppedImage || "/assets/placeholder.png"}
          alt="Cropped image preview"
          height={height}
          width={width}
        />
        <FileUploaderButton handleFileChange={handleFileChange} />

        <CropModal
          state={state}
          dispatch={dispatch}
          formDispatch={parentDispatch}
          urlToFile={urlToFile}
        />
        <Stack
          className={styles.image}
          direction={"column"}
          spacing={2}
        ></Stack>
      </Stack>
      {/* <button onClick={prepForForm}>Upload</button> */}
    </div>
  );
}
