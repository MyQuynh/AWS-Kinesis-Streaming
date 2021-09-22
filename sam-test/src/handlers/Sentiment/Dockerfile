FROM public.ecr.aws/lambda/python:3.8

COPY requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt
RUN python3.8 -m textblob.download_corpora 

COPY ./sentiment.py   ./

CMD ["sentiment.handler"]