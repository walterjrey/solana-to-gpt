import os
import dotenv
import json
from services.messages import chat_completion__with_function_calling
from services.messages import semantic_search_and_completion
from models.messages import MessageList

dotenv.load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GPT_MODEL = "gpt-3.5-turbo-16k-0613"


def handleStream(messages: list, token: str, user: str):
    yield "event:start\ndata: start\n\n"
    completion_fn_call = chat_completion__with_function_calling(user,
                                                                messages, token)
    if "completion" in completion_fn_call:
        for event in completion_fn_call['completion']:
            print(event)
            if 'choices' in event and event["choices"][0]["delta"].get("content") is not None:
                chunk = event["choices"][0]["delta"]["content"]
                json_data = json.dumps({"role": "stream", "content": chunk})
                yield f"event:message\ndata: {json_data}\n\n"
    else:
       for chunk in completion_fn_call["message"].split(" "):
        json_data = json.dumps({"role": "stream", "content": chunk + " "})
        yield f"event:message\ndata: {json_data}\n\n" 

    yield "event: end\ndata: end\n\n"


def response_stream(payload: MessageList, user):
    token = payload["token"]
    messages = payload["messages"]
    return handleStream(messages, token, user)
