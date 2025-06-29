import { useEffect } from "react";
import Chat from "./Chat";

const Widget = () => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      window.parent.postMessage(
        {
          type: "resize-iframe",
          height: document.body.scrollHeight,
        },
        "*"
      );
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div style={{ width: "100%", margin: 0, padding: 0 }}>
      <Chat />
    </div>
  );
};

export default Widget;
