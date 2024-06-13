### Please do not take this personally. It was made as a hobby project as an opportunity to learn the basics of React, Django REST framework and Canvas.

# Project Description
This is a 'yomama' meme generator which lets you enter a friend's name and the app will create a meme for you. You can then click a button, which will copy the meme image into your clipboard and you can then paste it to your friend. 

# Technology Used
For the API, Django REST framework was used. Canvas was used to dynamically create the images and React took care of everything in the frontend. For Styling, I used Bootstrap and pure CSS.

## How to run locally
For the backend, cd into the yomama directory where there is a requirements.txt file. Run the following commands:
```python3 -m venv venv```

```source venv/bin/activate```

```pip install -r requirements.txt```
    
```python manage.py makemigrations```

```python manage.py migrate```

```python manage.py runserver```


For the frontend, cd into the frontend/front directory where there is a package.json file. Run the following commands:
```yarn```

```yarn start```

### Credits
These are the two resources for this app:
1. https://humornama.com/jokes/yo-mama-jokes/
2. https://youtu.be/HQFxCxfhNUI