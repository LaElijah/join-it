import ContentWrapper from "@/app/_components/contentWrapper";
import Media from "@/app/_utils/models/media";
import { Metadata, BookData } from "@/app/_types/mediaTypes";


export default async function MediaPage({ params }: any) {
  const {
    title,
    type,
    subjects,
    metadata,
    reactions,
    data
  } = await Media.findById(params.id)

  const { submittedBy, verified, dateSubmitted } = metadata
  const {
    _id,
    authors,
    cover,
    datePublished,
    description,
    isbn,
    key,
    keywords,
    language,
    publisher,
    url
  }: BookData = data



  return (
   <ContentWrapper >
    <img src={cover}/>
    <p>{title}</p>
    {subjects.map((item: any) => <p key={item}>{item}</p>) }
    <p>{submittedBy}</p>
    <p>{verified}</p>
    <p>{dateSubmitted}</p>
    <p>{datePublished}</p>
    <p>{authors}</p>
    <p>{description}</p>
    <p>{isbn}</p>
    <p>{key}</p>
    <p>{keywords}</p>
    <p>{language}</p>
    <p>{publisher}</p>
    {/* <p>{url}</p> */}
    </ContentWrapper>
  )
}
