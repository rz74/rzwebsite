import os
import base64
import uuid
import json
import zipfile
from PIL import Image
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

# === CONFIGURATION ===
INPUT_DIR = "input_images"               # Folder containing input images
OUTPUT_DIR = "encrypted_output"          # Folder to store encrypted .enc files
ZIP_PATH = "encrypted_images.zip"        # Output ZIP file
ENV_PATH = "encryption_output.env"       # Output .env file
MAX_IMAGES = 10                          # Limit to 10 images

# === STEP 1 & 2: Ensure JPG format ===
def convert_to_jpg(directory):
    os.makedirs(directory, exist_ok=True)
    converted = []

    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if not os.path.isfile(filepath):
            continue

        name, ext = os.path.splitext(filename)
        ext = ext.lower()
        jpg_path = os.path.join(directory, f"{name}.jpg")

        if ext in [".jpg", ".jpeg"]:
            converted.append(filepath)
        else:
            try:
                img = Image.open(filepath).convert("RGB")
                img.save(jpg_path, "JPEG")
                converted.append(jpg_path)
            except Exception as e:
                print(f"Skipping {filename}: {e}")

    return converted[:MAX_IMAGES]

# === STEP 3: Generate AES key ===
def generate_key():
    key = get_random_bytes(32)  # AES-256
    return key, base64.b64encode(key).decode()

# === STEP 4–5: Encrypt and obfuscate ===
def encrypt_images(image_paths, key, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    obs_map = {}

    for path in image_paths:
        with open(path, "rb") as f:
            plaintext = f.read()

        nonce = get_random_bytes(12)
        cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
        ciphertext, tag = cipher.encrypt_and_digest(plaintext)
        encrypted_data = nonce + tag + ciphertext

        obfuscated_name = f"{uuid.uuid4().hex[:12]}.enc"
        output_path = os.path.join(output_dir, obfuscated_name)

        with open(output_path, "wb") as f:
            f.write(encrypted_data)

        obs_map[os.path.basename(path)] = obfuscated_name

    return obs_map

# === STEP 6: Zip encrypted files ===
def zip_encrypted_files(source_dir, zip_file_path):
    with zipfile.ZipFile(zip_file_path, "w") as zipf:
        for fname in os.listdir(source_dir):
            full_path = os.path.join(source_dir, fname)
            zipf.write(full_path, arcname=fname)

# === STEP 7: Save .env file ===
def save_env_file(path, base64_key, obfuscation_map):
    with open(path, "w") as f:
        f.write(f"AES_KEY_BASE64={base64_key}\n")
        f.write("OBFUSCATION_MAP=" + json.dumps(obfuscation_map) + "\n")

# === MAIN EXECUTION ===
def main():
    image_paths = convert_to_jpg(INPUT_DIR)
    if not image_paths:
        print("No valid images found.")
        return

    key, base64_key = generate_key()
    obs_map = encrypt_images(image_paths, key, OUTPUT_DIR)
    zip_encrypted_files(OUTPUT_DIR, ZIP_PATH)
    save_env_file(ENV_PATH, base64_key, obs_map)

    print(f"\n✅ Done! Encrypted files saved to: {ZIP_PATH}")
    print(f"🔐 AES key and map saved to: {ENV_PATH}")

if __name__ == "__main__":
    main()
