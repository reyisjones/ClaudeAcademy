from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import chromadb
from chromadb.config import Settings as ChromaSettings

from app.core.config import settings

router = APIRouter()

chroma_client = chromadb.HttpClient(
    host=settings.chroma_host,
    port=settings.chroma_port,
    settings=ChromaSettings(allow_reset=False),
)


class IndexRequest(BaseModel):
    collection: str = Field(..., min_length=1, max_length=100)
    documents: list[str] = Field(..., min_length=1, max_length=100)
    ids: list[str] = Field(..., min_length=1, max_length=100)


class QueryRequest(BaseModel):
    collection: str = Field(..., min_length=1, max_length=100)
    query: str = Field(..., min_length=1, max_length=2000)
    n_results: int = Field(default=5, ge=1, le=20)


class QueryResult(BaseModel):
    documents: list[str]
    distances: list[float]
    ids: list[str]


@router.post("/index")
async def index_documents(request: IndexRequest):
    if len(request.documents) != len(request.ids):
        raise HTTPException(status_code=400, detail="documents and ids must have the same length")

    collection = chroma_client.get_or_create_collection(name=request.collection)
    collection.add(documents=request.documents, ids=request.ids)
    return {"indexed": len(request.documents)}


@router.post("/query", response_model=QueryResult)
async def query_documents(request: QueryRequest):
    try:
        collection = chroma_client.get_collection(request.collection)
    except Exception:
        raise HTTPException(status_code=404, detail=f"Collection '{request.collection}' not found")

    results = collection.query(query_texts=[request.query], n_results=request.n_results)

    return QueryResult(
        documents=results["documents"][0] if results["documents"] else [],
        distances=results["distances"][0] if results["distances"] else [],
        ids=results["ids"][0] if results["ids"] else [],
    )
