import ContentWrapper from "@/app/_components/contentWrapper";
import Media from "@/app/_utils/models/media";
import { Media as MediaType } from "@/app/_types/mediaTypes";

export default async function MediaPage({ params }: any) {
  const {
    title
  } = await Media.findById(params.id)
  return (
   <ContentWrapper>
    {title}
    </ContentWrapper>
  )
}
