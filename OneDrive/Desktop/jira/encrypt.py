def encrypt(message):
    even_chars = message[::2] 
    odd_chars = message[1::2]  
    return even_chars + odd_chars


plain_text = input("Enter a message to encrypt: ")
encrypted = encrypt(plain_text)
print("Encrypted message:", encrypted)
