# --------random id generator---------
from bs4 import BeautifulSoup
import requests
import re
import string
import random


def id_generator(size=9, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

# ------------------------------------
# --------scrape metatags---------


def get_metadata(url):
    # turiu suhandlint errors, pvz jei nera tokio url - padaryta, ar istestuota?

    try:
        r = requests.get(url)
        website = BeautifulSoup(r.text, "lxml")
        metatags = ""
        for metatag in website.find_all('meta', property=re.compile(r'og\:')):
            metatags += (str(metatag))
            print(metatags)
        return metatags
    except:
        print('Error occured while getting metadata, proceeding without metadata.')
        return

# ------------------------------------
