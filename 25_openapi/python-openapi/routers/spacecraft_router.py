from fastapi import APIRouter
from pydantic import BaseModel


class Spacecraft(BaseModel):
    id: int
    name: str


spacecrafts = [
    Spacecraft(id=1, name="Apollo 13"),
    Spacecraft(id=2, name="Hubble"),
    Spacecraft(id=3, name="ISS"),
    Spacecraft(id=4, name="Voyager"),
]

router = APIRouter()


@router.get("/api/spacecrafts", tags=[spacecrafts], response_model=list[Spacecraft])
async def _():
    return spacecrafts


@router.get("/api/spacecrafts/{spacecraft_id}", tags=["spacecrafts"], response_model=Spacecraft)
async def _(spacecraft_id: int):
    for spacecraft in spacecrafts:
        if spacecraft.id == spacecraft_id:
            return spacecraft
    return None


