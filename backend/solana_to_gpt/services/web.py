from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import requests
from llama_index import download_loader
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import re

def get_stats_from_solana(token: str):
    try:
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Ejecutar Chrome en modo sin cabeza
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        driver = webdriver.Chrome(options=chrome_options)

        driver.get(f"https://explorer.solana.com/address/{token}")
        WebDriverWait(driver, 10).until(
            lambda driver: driver.execute_script("return document.readyState") == "complete"
        )

        values = {
            'price': None,
            '24_hour_volume': None,
            'market_cap': None,
            'direction': ''
        }

        retry = 6

        while values['market_cap'] is None and retry > 0:
            time.sleep(1)
            retry -= 1
            page_content = driver.execute_script("return document.getElementsByTagName('html')[0].innerHTML")

            soup = BeautifulSoup(page_content, 'html.parser')

            for card in soup.select('.card'):
                if card.select_one('h4') is not None and card.select_one('h1') is not None:
                    title = card.select_one('h4').get_text().strip()
                    value = card.select_one('h1').get_text().strip()
                    
                    if 'Price' in title:
                        values['price'] = float(re.findall(r"[\d.]+", value)[0])
                        if "↓" in value:
                            values['direction'] = 'down'
                        if "↥" in value:
                            values['direction'] = 'up'
                    elif '24 Hour Volume' in title:
                        values['24_hour_volume'] = float(re.findall(r"[\d.]+", value)[0])
                        if 'M' in value:
                            values['24_hour_volume'] = float(values['24_hour_volume']) * 1000000
                        if 'K' in value:
                            values['24_hour_volume'] = float(values['24_hour_volume']) * 1000
                    elif 'Market Cap' in title:
                        values['market_cap'] = re.findall(r"[\d.]+", value)[0]
                        if 'M' in value:
                            values['market_cap'] = float(values['market_cap']) * 1000000
                        if 'K' in value:
                            values['market_cap'] = float(values['market_cap']) * 1000
            
        return values
    except TimeoutError:
        print("Timed out waiting for page to load")

def get_web_links(start_url: str):
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Ejecutar Chrome en modo sin cabeza
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=chrome_options)

    skip_domains = ['www.facebook.com', 'www.reddit.com', 'www.twitter.com', 'www.instagram.com']

    domain = urlparse(start_url).netloc
    # Conjuntos para mantener un registro de URLs visitadas y pendientes
    visited_urls = set()
    pending_urls = {start_url}
    already_visited = []
    pdfs = []
    docs = []
    txts = []

    current_index = 1
    limit = 50

    # Función para obtener todos los enlaces de la página actual
    def get_links():
        anchors = driver.find_elements(By.TAG_NAME, "a")
        atag = []
        if anchors is None or len(anchors) == 0:
            return atag
        
        for anchor in anchors:
            try:
                href = anchor.get_attribute("href")
                if href is not None:
                    atag.append(href)
            except Exception as err:
                print(f"href error: {err}")

        return atag

    while pending_urls or current_index >= limit:
        # Tomar una URL pendiente
        current_url = pending_urls.pop()
        
        # Visitar la URL si no se ha visitado antes
        if current_url not in visited_urls:
            if current_url in already_visited:
                continue

            if "#" in current_url or "mailto" in current_url:
                continue
            url_parsed = urlparse(current_url)
            path = url_parsed.path
            print(f"path->{path}")
            if "http" not in url_parsed.scheme and "https" not in url_parsed.scheme:
                continue
            if "." in path:
                print(f"Dot or # in URL {current_url}")
                if ".pdf" in path:
                    pdfs.append(current_url)

                if ".doc" in path or ".docx" in path or ".txt" in path:
                    docs.append(current_url)

                if ".txt" in path:
                    txts.append(current_url)
                continue


            already_visited.append(current_url)

            try:
                response = requests.get(current_url)
                if response.status_code == 200:
                    print("La URL responde correctamente.")
                else:
                    print(f"La URL responde con el código de estado {response.status_code}.")
                    continue
            except requests.RequestException as e:
                print(f"No se pudo conectar a la URL. Error: {e}")
                continue

            try:
                print(f"Visitando: {current_url}")
                driver.get(current_url)
                WebDriverWait(driver, 10).until(
                    lambda driver: driver.execute_script("return document.readyState") == "complete"
                )
                #time.sleep(2)
            except TimeoutError:
                print("Timed out waiting for page to load")
                continue
            except Exception as err:
                print(f"current link error: {err}")
                continue
            
            
            # Procesar el contenido de la página aquí
            #page_content = driver.page_source
            
            #f = open(f"data/tokens/{token}/data/{current_index}.html","w+")
            #f.write(page_content)

            current_index = current_index + 1
            
            
            # Marcar la URL como visitada
            visited_urls.add(current_url)

            if url_parsed.netloc in skip_domains:
                continue

            if current_index >= limit:
                break
            
            # Obtener todos los enlaces de la página actual
            links = get_links()
            
            if links is not None and len(links) > 0:
                for link in links:
                    if link is None:
                        continue
                    if domain not in link and link not in pending_urls:
                        continue
                    pending_urls.add(link)
                    
                    
    # Cerrar el navegador
    driver.quit()
    result = {'links': already_visited, 'pdfs': pdfs, 'docs': docs, 'txts': txts}
    print("web scrapping finished")
    return result


def get_latest_post_twitter(twitter_url: str):
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Ejecutar Chrome en modo sin cabeza
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=chrome_options)

    texts = []
    try:
        driver.get(twitter_url)
        WebDriverWait(driver, 10).until(
            lambda driver: driver.execute_script("return document.readyState") == "complete"
        )
        time.sleep(5)
        driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
        time.sleep(3)
        driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
        time.sleep(3)
        driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
        time.sleep(3)
        texts = driver.execute_script('''
        const elements = document.querySelectorAll('[data-testid="tweetText"]');
        let texts = [];
        elements.forEach((element) => {
            texts.push(element.textContent);
        });
        return texts;
        ''')
        print(f"Latest post: {texts}")

        #time.sleep(2)
    except TimeoutError:
        print("Timed out waiting for page to load")
    except Exception as err:
        print(f"twitter_url error: {err}")


    driver.quit()
    
    return texts