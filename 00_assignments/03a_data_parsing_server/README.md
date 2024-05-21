# # 03a data parsing server

# Step-by-step

1.  Go into node directory and run

    ```
    $ node app.js
    ```

2.  Go into python directory and run
    ```
    $ poetry shell
    $ uvicorn main:app
    ```

Go to **localhost:8080** for the hosted node server
Go to **localhost:8000** for the hosted python server

endpoints:

-   /xml
-   /json
-   /txt
-   /csv
-   /yaml
