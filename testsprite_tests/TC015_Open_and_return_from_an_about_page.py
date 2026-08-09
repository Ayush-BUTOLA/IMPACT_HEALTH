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
        
        # -> Click the 'About' link in the navbar to open the About page.
        # About link
        elem = page.locator('xpath=/html/body/div/div/nav/div/div/div[2]/a')
        await elem.click(timeout=10000)
        
        # -> Navigate to the homepage (visit the site root at http://localhost:5173/).
        await page.goto("http://localhost:5173/")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Click the 'About' link in the navbar to open the About page.
        # About link
        elem = page.locator('xpath=/html/body/div/div/nav/div/div/div[2]/a')
        await elem.click(timeout=10000)
        
        # -> Click the site logo (top-left logo) to return to the homepage
        # link
        elem = page.locator('xpath=/html/body/div/div/nav/div/a')
        await elem.click(timeout=10000)
        
        # -> Click the top-left site logo to return to the homepage and verify the homepage is displayed.
        # link
        elem = page.locator('xpath=/html/body/div/div/nav/div/a')
        await elem.click(timeout=10000)
        
        # -> Click the top-left site logo to return to the homepage and verify the homepage is displayed.
        # link
        elem = page.locator('xpath=/html/body/div/div/nav/div/a')
        await elem.click(timeout=10000)
        
        # -> Click the site logo (top-left) to return to the homepage and verify the homepage is displayed
        # link
        elem = page.locator('xpath=/html/body/div/div/nav/div/a')
        await elem.click(timeout=10000)
        
        # -> Click the site logo (top-left) to return to the homepage and verify the homepage is displayed again.
        # link
        elem = page.locator('xpath=/html/body/div/div/nav/div/a')
        await elem.click(timeout=10000)
        
        # -> Click the top-left site logo to return to the homepage and verify the homepage is displayed.
        # link
        elem = page.locator('xpath=/html/body/div/div/nav/div/a')
        await elem.click(timeout=10000)
        
        # -> Click the top-left site logo (the logo in the navbar) to return to the homepage and verify the homepage hero content is displayed.
        # link
        elem = page.locator('xpath=/html/body/div/div/nav/div/a')
        await elem.click(timeout=10000)
        
        # -> Click the 'About' link in the navbar to open the About page.
        # About link
        elem = page.locator('xpath=/html/body/div/div/nav/div/div/div[2]/a')
        await elem.click(timeout=10000)
        
        # -> Click the site logo (top-left logo in the navbar) to return to the homepage and verify the homepage is displayed.
        # link
        elem = page.locator('xpath=/html/body/div/div/nav/div/a')
        await elem.click(timeout=10000)
        
        # --> Assertions to verify final state
        
        # --> Verify the homepage is displayed again
        await page.locator("xpath=/html/body/div[1]/div/nav/div/a").nth(0).scroll_into_view_if_needed()
        # Assert: The top-left site logo is visible, confirming the site returned to the homepage.
        await expect(page.locator("xpath=/html/body/div[1]/div/nav/div/a").nth(0)).to_be_visible(timeout=15000), "The top-left site logo is visible, confirming the site returned to the homepage."
        # Assert: The navigation 'Home' link is present, indicating the homepage is displayed.
        await expect(page.locator("xpath=/html/body/div[1]/div/nav/div/div[1]/div[1]/a").nth(0)).to_have_text("Home", timeout=15000), "The navigation 'Home' link is present, indicating the homepage is displayed."
        # Assert: The homepage hero metric '40+' is shown, verifying the homepage content is visible.
        await expect(page.locator("xpath=/html/body/div[1]/div/main/div[2]/div/section[1]/div[3]/div[1]/div[2]/div[3]/div[2]/div[1]").nth(0)).to_have_text("40+", timeout=15000), "The homepage hero metric '40+' is shown, verifying the homepage content is visible."
        current_url = await page.evaluate("() => window.location.href")
        # Assert: page loaded with a URL (final outcome verified by the AI judge during the run)
        assert current_url, 'Page should have loaded with a URL'
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    