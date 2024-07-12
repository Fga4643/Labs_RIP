from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializer import *
import requests

def text_to_bits(text, encoding='utf-8', errors='surrogatepass'):
    bits = bin(int.from_bytes(text.encode(encoding, errors), 'big'))[2:]
    return bits.zfill(8 * ((len(bits) + 7) // 8))

@api_view(["POST"])
def sender(request):
    a= text_to_bits(str(request.data))
    f=""
    for i in range(len(a)):
        if i%(130*8)==0 and i!=0:
            r = requests.post('http://127.0.0.1:8020/code/',json=f)
            print(r.text)
            f=a[i]
        else:
            f+=a[i]
    else:
        r = requests.post('http://127.0.0.1:8020/code/',json=f)
        print(r.text)      
    print("END")
    return Response("OK")

@api_view(["POST"])
def getter(request):
    a= text_to_bits(str(request.data))
    f=""
    for i in range(len(a)):
        if i%(130*8)==0 and i!=0:
            r = requests.post('http://127.0.0.1:8000/receive/',json=f)
            print(r.text)
            f=a[i]
        else:
            f+=a[i]
    else:
        r = requests.post('http://127.0.0.1:8000/receive/',json=f)
        print(r.text)      
    print("END")
    return Response("OK")

