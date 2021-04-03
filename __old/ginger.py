import sys, json, base64

def header(status, headers):
    head = '{'
    for header in headers:
        head += f'"{header[0]}":"{header[1]}"'
    head += '}'
    print(f'{status};{head}')

def write(text):
    print(f'{text}')

def ua():
    return decode(sys.argv[-1])

def cookie(c):
    return json.loads(decode(sys.argv[-2]))[c]

def decode(t):
    bytes = t.encode('ascii')
    msg_bytes = base64.b64decode(bytes)
    msg = msg_bytes.decode('ascii')
    return msg