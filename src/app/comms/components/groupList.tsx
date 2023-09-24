



export default function GroupList(props) {





    return (
        <div>
            

        {props.groups.map((group) => {
            return (
            <div key={group._id} >
                <h1>{group._id}</h1>
            </div>
            )
        })}
       </div>
    )
}