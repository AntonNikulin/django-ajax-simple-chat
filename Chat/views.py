from django.http import HttpResponse
from django.shortcuts import render_to_response

from .models import Message


def index(request):
    lastMessages=Message.objects.all().order_by("-id")[:10]
    return render_to_response('Chat/base.html',{"lastMessages": lastMessages})

def handle(request):
    #Client sending. Receiving new message
    if "Text" and "User" in request.GET:
        m=Message()
        m.Text=request.GET["Text"]
        m.User=request.GET["User"]
        m.save()
        return HttpResponse()
    #Client asking. Sending new messages
    if "id" in request.GET and request.GET["id"] != "":
        id = request.GET["id"]
        mes = Message.objects.filter(id__gt=id)
        return render_to_response("Chat/ajax_new_Messages.html", {"messages": mes})

