# HTTP API endpoint Node.js will call to 
from fastapi.responses import FileResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from image_gen import generate_image
import os
from fastapi.responses import FileResponse

@app.get("/images/{filename}")
async def get_image(filename: str):
    path = f"/content/generated_images/{filename}"
    return FileResponse(path, media_type="image/png")

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request format
class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate(prompt_req: PromptRequest):
    path = generate_image(prompt_req.prompt)
    return {"image_path": f"/images/{os.path.basename(path)}"}

@app.get("/images/{filename}")
async def get_image(filename: str):
    file_path = os.path.join("generated_images", filename)
    return FileResponse(path=file_path, media_type='image/png')