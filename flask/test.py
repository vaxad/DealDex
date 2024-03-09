import requests
from bs4 import BeautifulSoup
import re
import json

url = "https://www.cuponation.com.sg/amazon-promo-code"
response = requests.get(url)

# Parse the HTML content
soup = BeautifulSoup(response.text, "html.parser")

coupons = soup.find_all(class_="_1abe9s9d")

text=""
for coupon in coupons:
    text+=coupon.text+"\n"


regex_pattern = r'\$(\d+(?:\.\d+)?)([A-Z]+)(.*?)Code(.*?)Expiration date: (\d+/\d+/\d+)'
deal_pattern = r'(\d+)%OFFDeal(.*?)DealAmazon website will open in a new tab(\d+)%OFFGet deal'
deal_with_code_pattern = r'\$(\d+)(OFF)Code(.*?)CodeVerifiedAmazon website will open in a new tab\$(\d+)(OFF)See promo code ​Expiration date: (\d+/\d+/\d+)'

matches = re.findall(regex_pattern, text)
deals = re.findall(deal_pattern, text)
deals_with_code = re.findall(deal_with_code_pattern, text)

data = {
    "promo_codes": [
        {
            "discount_amount": match[0],
            "code": match[1],
            "description": match[2].strip(),
            "verified": match[3].strip(),
            "expiration_date": match[4]
        } for match in matches
    ],
    "deals": [
        {
            "discount_percent": deal[0],
            "description": deal[1].strip()
        } for deal in deals
    ],
    "deals_with_code": [
        {
            "discount_amount": deal[0],
            "discount_type": deal[1],
            "description": deal[2].strip(),
            "code_discount": deal[3],
            "expiration_date": deal[4]
        } for deal in deals_with_code
    ]
}

json_data = json.dumps(data, indent=4)
print(json_data)
