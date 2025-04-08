from diffusers import DiffusionPipeline
import torch
import os
from huggingface_hub import login

login(token=os.getenv("HF_TOKEN"))
path = f"/content/generated_images/{filename}"

# Using Stable Diffusion 3.5 From Hugging Face
pipe = DiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-3.5-large",
    torch_dtype=torch.float16,
    variant="fp16"
)
pipe.to("cuda" if torch.cuda.is_available() else "cpu")

def generate_image(prompt: str) -> str:
    image = pipe(prompt).images[0]
    filename = prompt[:30].replace(" ", "_") + ".png"
    path = os.path.join("generated_images", filename)
    image.save(path)
    return path