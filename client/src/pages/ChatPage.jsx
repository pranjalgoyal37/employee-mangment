import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import api from "../utils/api";

const accessToken = JSON.parse(localStorage.getItem("user")).token;
const socket = io("http://localhost:5050", {
  auth: { token: accessToken },
});
const ChatPage = () => {
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);

  // Join Socket room on mount
  useEffect(() => {
    if (currentUser) {
      socket.emit("join", { userId: currentUser._id });
    }
  }, [currentUser]);

  // Receive messages in real time
  useEffect(() => {
    socket.on("new_message", (msg) => {
      if (
        (msg.senderId === currentUser._id &&
          msg.receiverId === selectedUser?._id) ||
        (msg.receiverId === currentUser._id &&
          msg.senderId === selectedUser?._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on("user_online", ({ userId }) => {
      setOnlineUsers((prev) => [...new Set([...prev, userId])]);
    });

    socket.on("user_offline", ({ userId }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    });

    socket.on("typing", ({ senderId }) => {
      if (senderId === selectedUser?._id) {
        setTypingUser(senderId);
      }
    });

    socket.on("stop_typing", ({ senderId }) => {
      if (senderId === selectedUser?._id) {
        setTypingUser(null);
      }
    });

    return () => {
      socket.off("new_message");
      socket.off("user_online");
      socket.off("user_offline");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [selectedUser, currentUser]);

  // Load all users
  const loadUsers = async () => {
    const res = await api.get("/chat-users");
    console.log(res.data);
    setUsers(res.data.filter((u) => u._id !== currentUser._id));
  };

  // Load messages with selected user
  const loadMessages = async () => {
    const res = await api.get(
      `/messages/${currentUser._id}/${selectedUser._id}`
    );
    setMessages(res.data || []);
  };

  useEffect(() => {
    if (currentUser) loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) loadMessages();
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      await api.post("/messages/send", {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
        message: messageInput,
      });

      setMessageInput(""); // No need to update messages manually – socket handles it
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  const handleTyping = (e) => {
    setMessageInput(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
      });
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("stop_typing", {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
      });
    }, 1000);
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Please login to continue</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-[25%] min-w-[250px] bg-white border-r shadow-md overflow-y-auto">
        <div className="h-16 border-b flex items-center justify-center px-4">
          <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
        </div>

        <div className="p-4 space-y-2">
          {users.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            return (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
              >
                {/* Profile Pic */}
                <div className="relative">
                  {user.profilePic ? (
                    <img
                      src={`http://localhost:5050${user.profilePic}`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border shadow"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${
                      isOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>

                <div className="text-sm font-medium text-gray-700">
                  {user.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="h-16 border-b bg-white shadow flex items-center justify-between px-6">
          {selectedUser ? (
            <div className="flex items-center gap-4">
              {selectedUser?.profilePic ? (
                <img
                  src={`http://localhost:5050${selectedUser.profilePic}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border shadow"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                  {selectedUser?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedUser.name}
              </h2>
            </div>
          ) : (
            <p className="text-gray-500">Select a user to chat</p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {selectedUser ? (
            messages.length === 0 ? (
              <p className="text-center text-gray-400 mt-10">No messages yet</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.senderId === currentUser._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.senderId === currentUser._id
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a user to start chatting
            </div>
          )}

          {typingUser === selectedUser?._id && (
            <p className="text-sm text-gray-500">Typing...</p>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Type a message"
            value={messageInput}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
