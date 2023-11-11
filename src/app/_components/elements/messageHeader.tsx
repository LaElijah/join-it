

export default function MessageHeader(data: any) {
    // console.log(data)


    const serializedGroupName = data.groupName.includes(",")
        ? data.groupName.replace(/,/g, ", ")
        : data.groupName

    const splitNames = serializedGroupName.split(" ")



    return (
        <header>
            <h3>
                {
                    splitNames.length >= 4
                        ? `${splitNames[0]} ${splitNames[1]} ${splitNames[2]} and ${splitNames.length - 4} more`
                        : serializedGroupName
                } </h3>

        </header>
    )
}