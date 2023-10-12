export default function GroupList(props: any) {
  return (
    <div>
      {props.groups.map((group: any) => {
        return (
          <div key={group._id}>
            <h1>{group._id}</h1>
          </div>
        );
      })}
    </div>
  );
}
