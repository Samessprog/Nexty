from fastapi import FastAPI
from db.session import engine
import models

app = FastAPI()

models.Base.metadata.create_all(bind=engine)