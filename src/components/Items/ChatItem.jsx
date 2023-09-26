const ChatItem = ({ isAI, content }) => {
  return (
    <>
      {isAI ? (
        <div className="chat chat-start">
          <div className="chat-bubble bg-base-100 text-black shadow whitespace-pre-line">
            {content}
          </div>
        </div>
      ) : (
        <div className="chat chat-end">
          <div className="chat-bubble bg-base-100 text-black shadow whitespace-pre-line">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatItem;
