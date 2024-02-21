from dotenv import dotenv_values, load_dotenv
import os


#load_dotenv()
values = dotenv_values()
print(values)


load_dotenv()
print(os.getenv("SOMETHING"))
