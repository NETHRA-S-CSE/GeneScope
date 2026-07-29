# check_db.py

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

db = Chroma(
    persist_directory="chroma_db",
    embedding_function=embedding
)

print("Vector count:", db._collection.count())