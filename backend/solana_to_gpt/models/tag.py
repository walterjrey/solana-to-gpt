from pydantic import BaseModel

class Tag(BaseModel):
    tag: str
    slug: str
    count: int