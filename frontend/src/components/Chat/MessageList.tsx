import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  messages: { id: number; role: "user" | "ai"; content: string }[];
};

export function MessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4 flex flex-col">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="relative max-w-md">
              {/* 吹き出し本体 */}
              <div
                className={`p-4 rounded-2xl shadow-lg border ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none"
                } transition-all duration-200`}
              >
                {msg.content}
              </div>
              {/* 吹き出しのしっぽ */}
              <div
                className={`absolute w-0 h-0 ${
                  msg.role === "user"
                    ? "right-[-10px] bottom-2 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-primary"
                    : "left-[-10px] bottom-2 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-muted"
                }`}
              />
            </div>
          </div>
        ))}
        {/* スクロール追従用ダミー */}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
