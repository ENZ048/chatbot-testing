import React from 'react';

export default function ChatBubble({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:bg-blue-700"
    >
      💬
    </button>
  );
}