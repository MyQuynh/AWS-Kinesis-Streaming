FROM public.ecr.aws/lambda/python:3.8

COPY requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt 

COPY ./ingest3.py   ./

CMD ["ingest3.handler"]