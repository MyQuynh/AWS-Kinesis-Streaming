from datetime import datetime
import json
from urllib3.exceptions import ProtocolError
#!/usr/bin/env python
import nltk
nltk.download('all')
from nltk.corpus import stopwords 
from nltk.stem.wordnet import WordNetLemmatizer
import gensim
from gensim import corpora
import string
import argparse
import re


def extractHashtag(text):

    stop = set(stopwords.words("english"))
    exclude = set(string.punctuation) 
    lemma = WordNetLemmatizer()
    
    doc_complete = text.split('\n')

    def clean(doc):
        stop_free = " ".join([i for i in doc.lower().split() if i not in stop])
        punc_free = ''.join(ch for ch in stop_free if ch not in exclude)
        normalized = " ".join(lemma.lemmatize(word) for word in punc_free.split())
        return normalized

    doc_clean = [clean(doc).split() for doc in doc_complete]    
    dictionary = corpora.Dictionary(doc_clean)
    doc_term_matrix = [dictionary.doc2bow(doc) for doc in doc_clean]
    Lda = gensim.models.ldamodel.LdaModel
    ldamodel = Lda(doc_term_matrix, num_topics=4, id2word = dictionary, passes=50)
    topic = ldamodel.print_topics(num_topics=5, num_words=5)

    hashtags = []
    for t in topic: 
        for h in t[1].split('+'):
            hashtags.append('#'+h[h.find('"')+1:h.rfind('"')])

    print("HashTags: ")
    for ht in list(set(hashtags)):
        print(ht, end=' ')

    return hashtags

def handler(event, context):
    tweet = event['body']

    if (tweet == None):
        return {
        "statusCode": 200,
        "body": json.dumps({
            "message" : "ERROR! Cannot generate null tweet, please try again",
        }),
    }

    if (len(extractHashtag(tweet)) <= 0):
        return {
        "statusCode": 200,
        "body": json.dumps({
            "message" : "Cannot generate any hashtags, please try again",
        }),
    }

    return {
        "statusCode": 200,
        "body": {
            "hashtags":json.dumps(extractHashtag(tweet))
        }
    }
