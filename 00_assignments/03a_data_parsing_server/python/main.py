from fastapi import FastAPI
import requests

app = FastAPI()
url = "http://127.0.0.1:8080/"


@app.get("/csv")
def csv():
    response = requests.get(url + "csv").json()
    return {"data": response}


@app.get("/json")
def json():
    response = requests.get(url + "json").json()
    return {"data": response}


@app.get("/yaml")
def yaml():
    response = requests.get(url + "yaml").json()
    return {"data": response}


@app.get("/xml")
def xml():
    response = requests.get(url + "xml").json()
    return {"data": response}


@app.get("/txt")
def txt():
    response = requests.get(url + "txt").json()
    return {"data": response}
