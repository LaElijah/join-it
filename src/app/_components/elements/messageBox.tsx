"use client";

export default function MessageBox(props: {
  username: string;
  groupId: string;
  message: string;
}) {
  const { username, groupId, message } = props;

  const ws = new WebSocket(`ws://54.209.121.134`);

  const handleMessage = () => {
    ws.send(
      JSON.stringify({
        payload: {
          groupId: groupId,
          username: username,
          message: message,
          type: "group",
        },
      }),
    );
  };

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: "handshake",
        payload: {
          username: "John",
          groupId: "join-1",
        },
      }),
    );
  };

  ws.onmessage = (evt) => {
    console.log(JSON.parse(evt.data).payload);
  };

  return (
    <>
      <button onClick={handleMessage}>Send</button>
    </>
  );
}
