import ContentWrapper from "@/app/_components/contentWrapper";
import FeaturedMedia from "@/app/_components/featuredMedia";
import MediaShelf from "@/app/_components/mediaShelf";
import { Media as MediaType } from "@/app/_types/global";
import Media from "@/app/_utils/models/media"
import dbConnection from "@/app/_utils/db/dbConnection";

export default async function Shelf() {
  await dbConnection()
  const mediaData: MediaType[] = await Media.find({});

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
