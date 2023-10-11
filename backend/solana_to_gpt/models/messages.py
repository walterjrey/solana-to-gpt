from typing import List
from pydantic import BaseModel, Field

class Message(BaseModel):
    role: str = Field(..., description="Role of the sender, e.g., 'user'")
    content: str = Field(..., description="Content of the message")

class MessageList(BaseModel):
    messages: List[Message] = Field(..., description="List of messages")
    token: str = Field(..., description="Solana Token")