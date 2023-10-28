import ContentWrapper from "@/app/_components/contentWrapper";
import FeaturedMedia from "@/app/_components/featuredMedia";
import MediaShelf from "@/app/_components/mediaShelf";
import { Media } from "@/app/_types/global";
import { MockMediaData } from "@/app/_utils/data/mockMediaData";

export default function Shelf() {
  const mediaData: Media[] = MockMediaData;

  return (
    <section>
      <ContentWrapper>
      <FeaturedMedia mediaData={mediaData[1]} />
      </ContentWrapper>


      <ContentWrapper>
      <MediaShelf mediaData={mediaData} />
      </ContentWrapper>
    </section>
  );
}
