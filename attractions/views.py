from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from django.core.paginator import Paginator, Page
from .models import ProvinceModel, CityInfo, AttractionInfo
from django.db import connection


# Create your views here.
def get_paginator_data(paginator: Paginator, page_obj: Page, around_count: int = 2):
    """
    分页算法
    :param paginator:
    :param page_obj:
    :param around_count:页面显示范围
    :return:
    """
    current_page = page_obj.number
    num_pages = paginator.num_pages
    left_has_more = False
    right_has_more = False
    if current_page - around_count > 2:
        left_has_more = True
        left_pages = range(current_page - around_count, current_page)
    else:
        left_pages = range(1, current_page)
    if current_page + around_count + 1 < num_pages:
        right_has_more = True
        right_pages = range(current_page + 1, current_page + around_count + 1)
    else:
        right_pages = range(current_page + 1, num_pages + 1)
    return {
        'left_pages': left_pages,
        'right_pages': right_pages,
        'left_has_more': left_has_more,
        'right_has_more': right_has_more,
        'num_pages': num_pages,
        'current_page': current_page

    }


class ProvinceNavigation(ListView):
    model = ProvinceModel
    template_name = 'province_navigation.html'
    paginate_by = 12
    context_object_name = 'provinces'
    page_kwarg = 'p'
    ordering = 'id'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        paginator = context.get('paginator')
        page_obj = context.get('page_obj')
        pagination_data = get_paginator_data(paginator, page_obj, 2)
        context.update(pagination_data)
        return context


class AttractionsNavigation(ListView):
    template_name = 'attraction_navigation.html'
    paginate_by = 12
    page_kwarg = 'p'
    context_object_name = 'attraction_list'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        paginator = context.get('paginator')
        page_obj = context.get('page_obj')
        pagination_data = get_paginator_data(paginator, page_obj, 2)
        context.update(pagination_data)
        return context

    def get_queryset(self):
        pk = self.request.GET.get('pk')
        return AttractionInfo.objects.filter(city__province_id=pk).select_related('city')
