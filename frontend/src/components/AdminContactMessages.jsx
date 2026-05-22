import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to access admin panel");
        return;
      }

      const res = await fetch("http://localhost:5000/api/admin/contact-messages", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      } else {
        setError("Failed to fetch messages");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/admin/contact-messages/${messageId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        // Remove message from local state
        setMessages(messages.filter(msg => msg.id !== messageId));
      } else {
        alert("Failed to delete message");
      }
    } catch (err) {
      alert("Error deleting message");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
          <Button onClick={fetchMessages} variant="outline">
            Refresh
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <Card className="w-full">
          <CardContent className="p-6">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No messages found.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {message.name}
                        </h3>
                        <p className="text-blue-600 hover:text-blue-800">
                          {message.email}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        ID: {message.id}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                      {message.message}
                    </p>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => deleteMessage(message.id)}
                        variant="destructive" 
                        size="sm"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-sm text-gray-600 text-center">
          Total Messages: {messages.length}
        </div>
      </div>
    </div>
  );
}