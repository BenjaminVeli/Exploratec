### EXPLORATEC - TOUR 360° DEL CAMPUS SEDE LIMA DE TECSUP

360° Tour of the Lima Campus at Tecsup

### Create virtual environment :

```sh
python -m venv env
.\env\Scripts\activate
```

### Initialize Backend :

```sh
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```


### Initialize Frontend :

```sh
cd frontend
npm i
npm run dev
```