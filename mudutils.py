import mudconfig
import hmac
import hashlib
import base64

# utils 
def sha256(self, message):
    """Get SHA256 digest of a string"""
    digest = hmac.new(mudconfig.secretkey, msg=message, digestmod=hashlib.sha256).digest()
    return base64.b64encode(digest).decode()