import styles from "@/app/_styles/components/featuredMedia.module.scss";
import Image from "next/image";
import ImageDetails from "./elements/imageDetails";
import { Media, BookData } from "../_types/mediaTypes";

// const MediaContent = ({ type, data }: any) => {};

export default function FeaturedMedia(props: { mediaData: Media }) {
  const { title, type, subjects, metadata, reactions, data } = props.mediaData;

  // I cound have chip icons that
  // i can click on that expands into more
  // info like the subjects can be a
  // chip that when clicked expands to show
  // the categories after i map over them

  // Ignoring
  /**
   * key
   * type
   *
   */

  // In Bottom or side
  /**
   * metadata.dateSubmitted
   * reactions
   * data.description
   * data.authors
   */

  // In box temporarily
  /**
   * data.cover
   * data.isbn
   * data.language
   * data.keywords
   */

  // In box permanently
  /**
   * metadata.submittedBy
   * metadata.verified? Concidering replacing with community led actions
   * also wont be on because featured media will only be media of a certain community accepted standard
   *
   */

  if (type === "book") {
    return (
      <div className={styles.container}>
        <div className={styles.media}>
          <h1>Featured Media</h1>

          <section className={styles.mediaContainer}>
            <ImageDetails>
              <img
                height={200}
                width={200}
                src={(data as BookData).cover}
                alt="Book Cover"
              />

            
                <div className={styles.containedDetails}>
                  Hi these are details
                </div>
            </ImageDetails>
          </section>
        </div>


          <div className={styles.details}>These are more details first</div>
   
          <div className={styles.moreDetails}>These are more details second</div>

      </div>
    );
  } else if (type === "video") {
    return (
      <div className={styles.container}>
        <iframe
          width="707"
          height="480"
          src={data.url as string}
          title="Think Tanks: How Fake Experts Shape the News"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    );
  }
}
