from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return "Hello"


@app.get("/firstRoute")
def firstroute():
    return {"message": "first route"}
