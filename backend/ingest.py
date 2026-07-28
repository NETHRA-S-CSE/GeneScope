import os

from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

folder = "knowledge_base"

documents = []

for file in os.listdir(folder):
    if file.endswith(".pdf"):
        loader = PyMuPDFLoader(os.path.join(folder, file))
        docs = loader.load()

        print(f"Loaded {file}")

        documents.extend(docs)

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=150
)

chunks = splitter.split_documents(documents)

print(f"Total Chunks: {len(chunks)}")

embedding = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

db = Chroma.from_documents(
    documents=chunks,
    embedding=embedding,
    persist_directory="chroma_db"
)

print("✅ Vector database created successfully!")