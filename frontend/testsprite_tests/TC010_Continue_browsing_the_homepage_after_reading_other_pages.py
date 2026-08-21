import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:5173")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Navigate to the '/about' page (open the About page).
        await page.goto("http://localhost:5173/about")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the site logo (the 'IMPACT HEALTH' logo at the top-left of the page) to return to the homepage.
        # link
        elem = page.locator('xpath=/html/body/div/div/nav/div/a')
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Clicking the site logo returns the visitor to the homepage and homepage content is visible.
        # Assert-outcome: passed
        # Assert: The browser URL contains the site root, confirming the homepage was loaded.
        await expect(page).to_have_url(re.compile("http://localhost:5173/"), timeout=15000), "The browser URL contains the site root, confirming the homepage was loaded."
        # Assert-outcome: passed
        # Assert: The homepage 'Check Prices' link is visible with the expected text.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div[2]/div/section[1]/div[3]/div[1]/div[2]/div[1]/a[1]").nth(0)).to_have_text("Check Prices", timeout=15000), "The homepage 'Check Prices' link is visible with the expected text."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    