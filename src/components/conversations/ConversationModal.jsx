import React from 'react';

export default function ConversationModal({ conversation, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">Conversation</h2>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {conversation.messages.map((m, i) => (
            <div key={i} className="text-sm">
              <strong>{m.role}:</strong> {m.content}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
