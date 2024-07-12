from django.shortcuts import render, redirect

from spares.models import *


def index(request):
    query = request.GET.get("query")
    spares = Spare.objects.filter(name__icontains=query).filter(status='Enabled') if query else Spare.objects.filter(status='Enabled')

    context = {
        "search_query": query if query else "",
        "spares": spares
    }

    return render(request, "home_page.html", context)


def spare_details(request, spare_id):
    context = {
        "spare": Spare.objects.get(id=spare_id)
    }

    return render(request, "order_page.html", context)


def delete(request, spare_id):
    spare = Spare.objects.get(id=spare_id)
    spare.delete()

    return redirect("/")