import sys
from PIL import Image

def check_background(path):
    try:
        img = Image.open(path)
        img = img.convert("RGBA")
        pixels = img.load()
        # Check corners
        print(f"Checking {path}")
        corners = [(0,0), (img.width-1, 0), (0, img.height-1), (img.width-1, img.height-1)]
        for x,y in corners:
            print(f"Pixel at ({x},{y}): {pixels[x,y]}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_background("src/assets/mei_spritesheet.png")
    check_background("src/assets/totoro_spritesheet.png")
