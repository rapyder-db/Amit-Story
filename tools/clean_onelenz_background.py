from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage


ROOT = Path(__file__).resolve().parents[1]
FILES = [
    ROOT / "src" / "hero" / "OneLenz_Run.png",
    ROOT / "src" / "hero" / "OneLenz_Jump.png",
    ROOT / "src" / "hero" / "OneLenz_Victory.png",
]


def clean(path: Path) -> None:
    image = Image.open(path).convert("RGBA")
    data = np.array(image)
    rgb = data[:, :, :3].astype(np.int16)
    alpha = data[:, :, 3]

    max_rgb = rgb.max(axis=2)
    min_rgb = rgb.min(axis=2)
    low_saturation = (max_rgb - min_rgb) <= 30
    light_background = (rgb[:, :, 0] >= 202) & (rgb[:, :, 1] >= 202) & (rgb[:, :, 2] >= 202)
    candidate = (alpha == 0) | (light_background & low_saturation)

    seed = np.zeros(candidate.shape, dtype=bool)
    seed[0, :] = candidate[0, :]
    seed[-1, :] = candidate[-1, :]
    seed[:, 0] = candidate[:, 0]
    seed[:, -1] = candidate[:, -1]

    edge_background = ndimage.binary_propagation(seed, mask=candidate)

    # Catch one-pixel antialias fringes that touch the removed background.
    fringe = ndimage.binary_dilation(edge_background, iterations=1) & candidate
    remove = edge_background | fringe

    data[remove, 3] = 0
    Image.fromarray(data).save(path)
    print(f"Cleaned {path.relative_to(ROOT)}")


for file_path in FILES:
    clean(file_path)
