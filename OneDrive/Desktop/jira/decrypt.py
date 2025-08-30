def decrypt(encrypted_message):
    mid = (len(encrypted_message) + 1) // 2
    even_chars = encrypted_message[:mid]
    odd_chars = encrypted_message[mid:]

    
    decrypted = []
    for i in range(len(odd_chars)):
        decrypted.append(even_chars[i])
        decrypted.append(odd_chars[i])

    if len(even_chars) > len(odd_chars):
        decrypted.append(even_chars[-1])

    return ''.join(decrypted)


cipher_text = input("Enter an encrypted message to decrypt: ")
decrypted = decrypt(cipher_text)
print("Decrypted message:", decrypted)
