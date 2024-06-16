import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import constant_time
from base64 import b64encode, b64decode
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.environ["SECRET_KEY"]


# get a 256-bit key from the secret
def get_key(secret: str, salt: bytes) -> bytes:
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend(),
    )
    return kdf.derive(secret.encode())


# encrypt plaintext
def encrypt(plaintext: str) -> str:
    try:
        salt = os.urandom(16)
        key = get_key(SECRET_KEY, salt)
        iv = os.urandom(16)
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        encryptor = cipher.encryptor()

        padder = padding.PKCS7(algorithms.AES.block_size).padder()
        padded_data = padder.update(plaintext.encode()) + padder.finalize()

        ciphertext = encryptor.update(padded_data) + encryptor.finalize()

        return b64encode(salt + iv + ciphertext).decode()
    except:
        return plaintext


# decrypt ciphertext
def decrypt(ciphertext: str) -> str:
    try:
        data = b64decode(ciphertext)
        salt = data[:16]
        iv = data[16:32]
        actual_ciphertext = data[32:]

        key = get_key(SECRET_KEY, salt)
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()

        decrypted_padded_data = (
            decryptor.update(actual_ciphertext) + decryptor.finalize()
        )
        unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
        decrypted_data = unpadder.update(decrypted_padded_data) + unpadder.finalize()

        return decrypted_data.decode()
    except:
        return ciphertext


plaintext = "This is a secret message."

encrypted = encrypt(plaintext)
print(f"Encrypted: {encrypted}")

decrypted = decrypt(encrypted)
print(f"Decrypted: {decrypted}")
