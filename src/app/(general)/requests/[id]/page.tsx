import Image from "next/image";
import Link from "next/link";
import Request from "@/app/_utils/models/request";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import dbConnection from "@/app/_utils/db/dbConnection";
import User from "@/app/_utils/models/user";

interface Props {
  params: any;
}

export default async function Post({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/api/auth/signin");
  }

  await dbConnection();
  const request = await Request.findById(params.id);
  const user = await User.findOne({ username: request.username });
  const { username, profile, id, identity } = user;

  const {
    date,
    resource,
    details,
    progress,
    goal,
    category,
    description,
    metric,
    image,
  } = request;

  return (
    <div>
      <Link href={`/requests/create`}>Create a post</Link>
      <section>
        <h1>{username}</h1>
        <Image alt="request image" width={100} height={100} src={image} />
        <p>{description}</p>
        <p>{category}</p>
        <p>{metric}</p>
        <p>{goal}</p>
        <p>{progress}</p>
        <p>{details}</p>
        <p>{new Date(date).toLocaleDateString()}</p>

        <p>{metric}</p>

        <h2>Requesting: {resource}</h2>
      </section>
    </div>
  );
}
