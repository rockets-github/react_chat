// Reactの状態管理：メッセージ配列を管理
import { useState } from "react";

// コンポーネントのインポート
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  // 送信されたメッセージを配列に追加する関数
  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: text },
      { id: Date.now(), role: "ai", content: "そうだね" },
    ]);
    // AIの返信は未実装
  };

  return (
    <div className="h-screen flex flex-col p-4 bg-muted">
      <div className="flex-1 overflow-y-auto">
        {/* チャットの履歴表示 */}
        <MessageList messages={messages} />
      </div>

      {/* メッセージ入力フォーム */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}
