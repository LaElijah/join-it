import ContentWrapper from "@/app/_components/contentWrapper";

export default function Media({ params }: any) {
  return <ContentWrapper>{params.id}</ContentWrapper>;
}
