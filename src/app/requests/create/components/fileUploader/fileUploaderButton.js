

import styles from './fileUploaderButton.module.scss'  

export default function FileUploaderButton(props) {


    return (
        <div className={styles.container}>
        <div className={styles.buttonWrapper}>
        <label  for="upload">Upload File</label>
        <input id="upload" type="file" onChange={props.handleFileChange} />
      </div>
    </div>
    )
}