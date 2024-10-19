import { useCallback, useEffect, useRef, useState } from "react";
import { SocketData } from "../../types/socket-data";

import SharedWorker from "../../workers/shared-worker?sharedworker";

type Props = {
  initialData?: SocketData;
};

type Result = {
  message: SocketData | null;
  loading: boolean;
  sendMessage: (message?: string) => void;
};

function useSharedWorker({ initialData }: Props): Result {
  const worker = useRef<SharedWorker | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<SocketData | null>(
    initialData ?? null
  );

  const sendMessage = useCallback((message?: string) => {
    if (worker.current) {
      setLoading(true);
      worker.current.port.postMessage(message);
    }
  }, []);

  useEffect(() => {
    worker.current = new SharedWorker();

    worker.current.port.onmessage = (event: MessageEvent<string>) => {
      let messageData = null;
      const { data } = event;

      try {
        messageData = JSON.parse(data);
      } catch {
        messageData = data;
      }

      setLoading(false);
      setMessage(messageData);
    };

    if (worker.current) {
      worker.current.port.start();
    }

    return () => {
      if (worker.current) {
        worker.current.port.close();
      }
    };
  }, []);

  return {
    message,
    loading,
    sendMessage,
  };
}

export default useSharedWorker;
