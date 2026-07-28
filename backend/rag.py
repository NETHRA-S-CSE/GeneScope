import os
from dotenv import load_dotenv

from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()

# ----------------------------
# Embedding Model
# ----------------------------

embedding = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

# ----------------------------
# Load ChromaDB
# ----------------------------

db = Chroma(
    persist_directory="chroma_db",
    embedding_function=embedding
)

retriever = db.as_retriever(
    search_type="mmr",
    search_kwargs={
        "k": 4,
        "fetch_k": 10,
        "lambda_mult": 0.7
    }
)

# ----------------------------
# Groq LLM
# ----------------------------

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0
)

# ----------------------------
# Prompt
# ----------------------------
prompt = ChatPromptTemplate.from_template("""
You are GeneScope, an AI assistant specialized in women's health.

Use ONLY the provided context to answer.

Rules:
- Do not make up information.
- If the answer is not in the context, say:
  "I couldn't find sufficient information in the knowledge base."
- Do not diagnose diseases.
- Do not prescribe medicines.
- Encourage users with severe, persistent, or emergency symptoms to consult a qualified healthcare professional.
- Keep answers clear, accurate, and easy to understand.

Context:
{context}

Question:
{question}
""")

# ----------------------------
# Main Function
# ----------------------------

def ask_genescope(question: str):

    docs = retriever.invoke(question)

    context = "\n\n".join(doc.page_content for doc in docs)

    chain = prompt | llm

    response = chain.invoke({
        "context": context,
        "question": question
    })

    seen = set()
    sources = []

    for doc in docs:
        source = (
            os.path.basename(doc.metadata["source"]),
            doc.metadata.get("page", 0) + 1
        )
        if source not in seen:
            seen.add(source)
            sources.append({
                "file": source[0],
                "page": source[1]
            })

    return {
        "answer": response.content,
        "sources": sources
    }


# ----------------------------
# Test
# ----------------------------

if __name__ == "__main__":

    while True:

        question = input("\nAsk GeneScope: ")

        if question.lower() == "exit":
            break

        result = ask_genescope(question)

        print("\nAnswer\n")
        print(result["answer"])

        print("\nSources")

        for s in result["sources"]:
            print(f"- {s['file']} (Page {s['page']})")