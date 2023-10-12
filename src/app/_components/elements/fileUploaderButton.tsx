import styles from "@/app/_styles/elements/fileUploaderButton.module.scss";

export default function FileUploaderButton(props: any) {
  const { handleFileChange } = props;

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <label htmlFor="upload">Upload File</label>
        <input id="upload" type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
}
