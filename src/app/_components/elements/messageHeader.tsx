

export default function MessageHeader( data: any) {
    // console.log(data)


    return (
        <header>
            {data.hostname}
            {data.groupId}
        </header>
    )
}