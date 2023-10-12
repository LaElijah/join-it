import Request from "./elements/request";

export default function RequestsList({ requestData }: { requestData: string }) {
  const requests = JSON.parse(requestData) || [
    {
      _id: "none",
      username: "None",
      resource: "None",
      details: "None",
      progress: "None",
      goal: "None",
      category: "None",
      url: "None",
      image: "/assets/placeholder.png",
      date: "01/01/1970",
    },
  ];

  // Have the original children displayed
  // into the

  // Create a map

  // TODO: Add an infinite scroll option
  return requests.map((data: any) => (
    <Request
      {...data}
      key={data._id}
      url={`/requests/${data._id}`}
      date={new Date(data.date).toLocaleDateString()}
    />
  ));
}
