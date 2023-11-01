



export default function MessageBody({data}: any) {
    if (data) {
    const username = data?.username || "H"

    return (
        <div>
            {username}
            <h2>Hi</h2>
           
        </div>
    )
    }
    else {
        return <></>
    }
}