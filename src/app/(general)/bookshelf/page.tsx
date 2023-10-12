import FeaturedMedia from "@/app/_components/featuredMedia";
import MediaShelf from "@/app/_components/mediaShelf";
import { Media } from "@/app/_types/index";
import { MockMediaData } from "@/app/_utils/data/mockMediaData";

export default function Shelf() {
  const mediaData: Media[] = MockMediaData;

  return (
    <section>
      <FeaturedMedia mediaData={mediaData[1]} />

      <MediaShelf mediaData={mediaData} />
    </section>
  );
}
