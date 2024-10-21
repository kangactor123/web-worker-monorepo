let connections: WeakRef<MessagePort>[] = [];
const socket: WebSocket = new WebSocket("ws://localhost:8080");

// connection check for memory leak
const intervalId = setInterval(() => {
  let tempArray = [...connections];
  for (let i = 0; i < connections.length; i++) {
    const port = connections[i];

    if (!port.deref()) {
      tempArray = tempArray.filter((_, idx) => idx !== i);
    }
  }
  connections = [...tempArray];
}, 5000);

self.onconnect = (event) => {
  const port = event.ports[0];
  const weakPort = new WeakRef<MessagePort>(port);

  connections.push(weakPort);

  if (!weakPort.deref()) {
    return;
  }

  port.onmessage = (event: MessageEvent<string>) => {
    const { data: message } = event;

    if (message === "CLOSE_SOCKET") {
      socket.close();
    }

    if (socket.readyState === socket.CONNECTING) {
      postMessage(
        JSON.stringify({ type: "MESSAGE", data: "Socket is connecting..." })
      );
      return;
    }

    if (socket) {
      socket.send(message);
    }
  };
};

self.onclose = () => {
  console.log("close..");
  clearInterval(intervalId);
};

socket.onmessage = (event: MessageEvent<string>) => {
  const { data: serverMessage } = event;
  console.log("worker from socket: ", serverMessage);

  connections.forEach((connection) => {
    const port = connection.deref();

    if (port) {
      port.postMessage(serverMessage);
    }
  });
};

socket.onopen = () => {
  socket.send("PING");
};

socket.onerror = () => {
  postMessage(JSON.stringify({ type: "MESSAGE", data: "소켓 에러입니다." }));
};
