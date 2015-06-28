import mudconfig

# utils 
def sha256(message):
    """Get SHA256 digest of a string"""

    import hmac
    import hashlib
    import base64
    
    digest = hmac.new(mudconfig.secretkey, msg=message, digestmod=hashlib.sha256).digest()
    return base64.b64encode(digest).decode()

def parse_html(url):
    """Parse HTML page, using lxml and a call GET of the page"""

    from lxml import html
    import requests
    from flask import Markup

    page = requests.get(url)
    tree = html.fromstring(page.text)

    images  = tree.xpath('//img/@src')
    title   = tree.xpath('//title/text()')
    return {
        'body'  : Markup(page.text).striptags(),
        'title' : title[0] if (len(title) > 0) else None,
        'image' : images[0] if (len(images) > 0) else None
    }