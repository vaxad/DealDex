import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import re 

def capture_url_after_delay(url, delay=3):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        driver.get(url)
        time.sleep(delay)
        current_url = driver.current_url
        return current_url
    finally:
        driver.quit()

def extract_lat_long_from_url(url):
    pattern = r'@(-?\d+\.\d+),(-?\d+\.\d+),'
    match = re.search(pattern, url)
    if match:
        latitude = float(match.group(1))
        longitude = float(match.group(2))
        return latitude, longitude
    else:
        return None, None

url = "https://www.google.com/maps/place/NIKE/data=!4m7!3m6!1s0x3be7c87d64681a85:0x431c435277ef248f!8m2!3d19.086601!4d72.888974!16s%2Fg%2F11g879lyxn!19sChIJhRpoZH3I5zsRjyTvd1JDHEM?authuser=0&hl=en&rclk=1"
captured_url = capture_url_after_delay(url)
latitude, longitude = extract_lat_long_from_url(captured_url)
print("Latitude:", latitude)
print("Longitude:", longitude)
