'use client';
import { useEffect, useState } from 'react';
import SunSpeechBubble from './SunSpeechBubble';

// 開くたびに messages からランダムに1つ選んで表示する吹き出し。
// 初期表示（SSR）は messages[0] 固定にして hydration mismatch を避け、
// マウント後に別のメッセージへ差し替える。
export default function RotatingSpeechBubble({ messages, ...props }) {
  const [text, setText] = useState(messages[0]);

  useEffect(() => {
    setText(messages[Math.floor(Math.random() * messages.length)]);
  }, [messages]);

  return <SunSpeechBubble {...props}>{text}</SunSpeechBubble>;
}
