"""
Tutor Agent — Claude-powered AI tutor for ClaudeTuts.

Uses LangGraph for state management and tool orchestration.
"""
from __future__ import annotations

import json
from typing import Annotated, TypedDict

import anthropic
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages

from agents.tools import search_lessons, run_code_snippet, get_module_info


client = anthropic.Anthropic()

SYSTEM_PROMPT = """You are an expert AI tutor for ClaudeTuts, an interactive learning platform
for Anthropic Claude and AI technologies.

Your responsibilities:
- Answer questions about Claude, prompt engineering, AI agents, MCP, RAG, and AI safety
- Guide learners through exercises with hints, not just answers
- Use the search_lessons tool to find relevant lesson content
- Use run_code_snippet to demonstrate code examples
- Adapt your explanations to the learner's level (beginner, intermediate, advanced)

Be encouraging, clear, and concise. Use code examples where helpful."""

TOOLS = [
    {
        "name": "search_lessons",
        "description": "Search the lesson database for content relevant to a topic",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "The topic or question to search for"}
            },
            "required": ["query"],
        },
    },
    {
        "name": "run_code_snippet",
        "description": "Execute a Python code snippet and return the output",
        "input_schema": {
            "type": "object",
            "properties": {
                "code": {"type": "string", "description": "Python code to execute"}
            },
            "required": ["code"],
        },
    },
    {
        "name": "get_module_info",
        "description": "Get information about a specific learning module",
        "input_schema": {
            "type": "object",
            "properties": {
                "module_slug": {"type": "string", "description": "The module identifier (e.g. 'prompt-engineering')"}
            },
            "required": ["module_slug"],
        },
    },
]

TOOL_MAP = {
    "search_lessons": search_lessons,
    "run_code_snippet": run_code_snippet,
    "get_module_info": get_module_info,
}


class TutorState(TypedDict):
    messages: Annotated[list, add_messages]
    user_level: str


def call_claude(state: TutorState) -> TutorState:
    messages = state["messages"]
    system = SYSTEM_PROMPT + f"\n\nLearner level: {state.get('user_level', 'intermediate')}"

    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=2048,
        system=system,
        tools=TOOLS,
        messages=messages,
    )

    # Convert to LangGraph message format
    state["messages"] = messages + [{"role": "assistant", "content": response.content}]
    return state


def execute_tools(state: TutorState) -> TutorState:
    messages = state["messages"]
    last_message = messages[-1]

    tool_results = []
    for block in last_message["content"]:
        if block.type == "tool_use":
            tool_fn = TOOL_MAP.get(block.name)
            if tool_fn:
                result = tool_fn(**block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result),
                })

    if tool_results:
        state["messages"] = messages + [{"role": "user", "content": tool_results}]

    return state


def should_continue(state: TutorState) -> str:
    last_message = state["messages"][-1]
    if isinstance(last_message.get("content"), list):
        for block in last_message["content"]:
            if hasattr(block, "type") and block.type == "tool_use":
                return "execute_tools"
    return END


def build_tutor_graph() -> StateGraph:
    graph = StateGraph(TutorState)
    graph.add_node("call_claude", call_claude)
    graph.add_node("execute_tools", execute_tools)

    graph.set_entry_point("call_claude")
    graph.add_conditional_edges("call_claude", should_continue, {
        "execute_tools": "execute_tools",
        END: END,
    })
    graph.add_edge("execute_tools", "call_claude")

    return graph.compile()


tutor_graph = build_tutor_graph()
