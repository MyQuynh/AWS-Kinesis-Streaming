import json
import requests
import bs4
import nltk
nltk.download('all')
from nltk.corpus import stopwords 
from nltk.stem.wordnet import WordNetLemmatizer
import gensim
from gensim import corpora
import string
import re

regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)

def extractHashtag(url):

    stop = set(stopwords.words("english"))
    exclude = set(string.punctuation) 
    lemma = WordNetLemmatizer()
    path=url

    text = ''
    if(re.match(regex, path) != None):

        print('[Url found]')

        html = bs4.BeautifulSoup(requests.get(path).text, "html.parser")

        data = html.find_all(text=True)
        def visible(element):
            if element.parent.name in ['style', 'script', '[document]', 'head', 'title']:
                return False
            elif re.match('<!--.*-->', str(element.encode('utf-8'))):
                return False
            return True

        results = filter(visible, data)
        text = u" ".join(t.strip() for t in results)
    else:
        text = open(path).read()

    
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
    return hashtags

def lambda_handler(event, context):

    tweet = event['body']

    if (tweet == None):
        return {
        "statusCode": 200,
        "body": json.dumps({
            "message" : "ERROR! Cannot generate text, please try again",
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