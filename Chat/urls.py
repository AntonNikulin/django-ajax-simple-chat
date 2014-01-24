from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
                       url(r"^$", "Chat.views.index"),
                       url(r"^handle/$", "Chat.views.handle"),
                       )
