#--------random id generator---------
import string
import random
def id_generator(size=9, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))
#------------------------------------
#--------scrape metatags---------
import re
import requests
from bs4 import BeautifulSoup
def get_metadata(url):

    r = requests.get(url)

    website = BeautifulSoup(r.text, "lxml")
    metatags= ""
    for metatag in website.find_all('meta', property=re.compile(r'og\:')):
        metatags+=(str(metatag))  
        print(metatags)
    return metatags
#------------------------------------