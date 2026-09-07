from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    # Listen for console events
    page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))
    page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))
    
    bundle_path = os.path.abspath("C:/Users/r.tofan/.gemini/antigravity/scratch/asutp-fitness-app/bundle.html")
    page.goto(f"file:///{bundle_path}")
    page.wait_for_timeout(2000)  # Wait for a couple of seconds to ensure everything runs
    
    page.screenshot(path="C:/Users/r.tofan/.gemini/antigravity/brain/a66ec815-768f-4f5a-8e6a-0af802481c84/app_screenshot.png")
    print("Screenshot saved to brain directory.")
    browser.close()