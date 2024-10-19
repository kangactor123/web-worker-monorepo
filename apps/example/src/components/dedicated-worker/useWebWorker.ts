import { useCallback, useEffect, useRef, useState } from "react";

import { SocketData } from "../../types/socket-data";

import Worker from "../../workers/shared-worker?worker";

type Props = {
  initialData?: SocketData;
};

type Result = {
  message: SocketData | null;
  loading: boolean;
  sendMessage: (message?: string) => void;
};

function useWebWorker({ initialData }: Props): Result {
  const worker = useRef<Worker | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<SocketData | null>(
    initialData ?? null
  );

  const sendMessage = useCallback((message?: string) => {
    if (worker.current) {
      setLoading(true);
      worker.current.postMessage(message);
    }
  }, []);

  useEffect(() => {
    worker.current = new Worker();

    worker.current.onmessage = (event: MessageEvent<string>) => {
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

    return () => {
      if (worker.current) {
        worker.current.terminate();
      }
    };
  }, []);

  return {
    message,
    loading,
    sendMessage,
  };
}

export default useWebWorker;
