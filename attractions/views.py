from django.shortcuts import render

# Create your views here.

def first_page_view(request):
    return render(request,"index.html")