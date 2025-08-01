# tools/local_search_anuschka.py

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, quote_plus
import re
import os
import json
try:
    from ddgs import DDGS
except ImportError:
    from duckduckgo_search import DDGS


def search_anuschka_products(query: str) -> list[dict]:
    """
    Searches for Anuschka products using DuckDuckGo site search. It uses a
    multi-step process to reliably extract the main image URL from the product page.
    """
    products = []
    base_url = "https://www.anuschkaleather.com"
    site_query = f"site:anuschkaleather.com {query}"
    seen_urls = set()

    print(f"[🦆] Searching DuckDuckGo for: {site_query}")
    try:
        with DDGS() as ddgs:
            # Get more results to increase chances of finding valid products
            results = list(ddgs.text(site_query, max_results=15))
    except Exception as e:
        print(f"[❌] DuckDuckGo search failed: {e}")
        results = []

    for r in results:
        url = r.get('href') or r.get('url')
        # Ensure we are only processing valid product pages
        if not url or 'anuschkaleather.com/products/' not in url:
            continue

        url = url.split('?')[0]  # Clean up URL parameters
        if url in seen_urls:
            continue
        seen_urls.add(url)

        print(f"[🔗] Processing product page: {url}")
        try:
            resp = requests.get(url, timeout=20)
            resp.raise_for_status()
            soup = BeautifulSoup(resp.content, 'html.parser')

            title = soup.select_one(
                'h1.product__title, h1.product-title, h1, title')

            title = title.get_text(strip=True) if title else 'N/A'

            price = soup.select_one(
                '.price__regular .price-item, .product__price, .price, .product-price')
            price = price.get_text(
                strip=True) if price else 'Price not available'

            # --- NEW, MORE ROBUST IMAGE EXTRACTION STRATEGY ---
            image_url = ''

            # 1. Try to find JSON-LD structured data (most reliable method)
            json_ld_script = soup.find(
                'script', {'type': 'application/ld+json'})
            if json_ld_script:
                try:
                    data = json.loads(json_ld_script.string)
                    if isinstance(data, list):
                        data = data[0]
                    if data.get('@type') == 'Product':
                        image_data = data.get('image')
                        if isinstance(image_data, list) and image_data:
                            image_url = image_data[0]
                        elif isinstance(image_data, str):
                            image_url = image_data
                        if image_url:
                            print(
                                f"[✅] Found image URL in JSON-LD data: {image_url}")
                except (json.JSONDecodeError, KeyError, IndexError) as e:
                    print(f"[⚠️] Could not parse JSON-LD data: {e}")

            # 2. If JSON-LD fails, try Open Graph meta tags (very reliable)
            if not image_url:
                og_image = soup.find('meta', {'property': 'og:image'})
                if og_image and og_image.get('content'):
                    image_url = og_image['content']
                    print(
                        f"[✅] Found image URL in Open Graph meta tag: {image_url}")

            # 3. If that fails, try a broad set of CSS selectors
            if not image_url:
                selectors = [
                    'figure.product__media img',
                    '.product-gallery__image img',
                    '.product-image-main img',
                    'img.product-gallery__image',
                    'img.product__image'
                ]
                image_element = soup.select_one(', '.join(selectors))
                if image_element:
                    src = image_element.get(
                        'src') or image_element.get('data-src')
                    if src:
                        if src.startswith('//'):
                            image_url = f"https:{src}"
                        else:
                            image_url = urljoin(base_url, src)
                        print(
                            f"[🖼️] Successfully extracted image URL with CSS selector: {image_url}")

            if not image_url:
                print(
                    "[❌] Could not find an image URL for this product using any method.")

            desc = soup.select_one(
                '.product__description, .product-description, .product__info-content')
            description = desc.get_text(strip=True) if desc else ''

            products.append({
                'title': title,
                'price': price,
                'url': url,
                'image_url': image_url,
                'description': description,
            })
        except Exception as e:
            print(f"[⚠️] Error scraping {url}: {e}")
            continue

    if not products:
        print("[❌] No products found after searching and processing.")

    print(f"[🔍] Successfully extracted {len(products)} products.")
    return products
