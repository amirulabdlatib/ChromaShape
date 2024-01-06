from django.http import HttpResponse
from django.shortcuts import redirect, render
from .models import ChromaShape
from .serializers import ChromaShapeSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import login,logout,authenticate



# API VIEWS
@api_view(['GET','POST'])
def shape_color_list(request):
    
    # read all data
    if request.method == 'GET':

        shape_color = ChromaShape.objects.all()
        serializer = ChromaShapeSerializer(shape_color,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    # create new data
    if request.method == 'POST':
        serializer = ChromaShapeSerializer(data=request.data)
        
        # checking if the data is valid
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET','PUT','DELETE'])
def shape_color_detail(request,id):
    try:
        shape_color = ChromaShape.objects.get(pk=id)
    except ChromaShape.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET':
        serializer = ChromaShapeSerializer(shape_color)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer = ChromaShapeSerializer(shape_color,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    elif request.method == 'DELETE':
        shape_color.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# WEB VIEWS


def index(request):
    return render(request,'ChromaShape/index.html')

# regular user page
def user(request):
    return render(request,'ChromaShape/user.html')

def render_login(request):
    return render(request,'ChromaShape/login.html')

def doLogin(request):

    # if user tries to login using 
    if request.method != 'POST':
        return HttpResponse('Method not allowed')
    
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')

        user_obj = authenticate(request,username=username,password=password)

        if user_obj is not None:
            login(request,user_obj)
            return redirect('index')
        else:
            return redirect('login')
        
def doLogout(request):
    logout(request)
    return redirect('index')