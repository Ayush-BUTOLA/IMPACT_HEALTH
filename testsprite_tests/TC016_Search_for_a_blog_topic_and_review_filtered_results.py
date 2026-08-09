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
        
        # -> Open the 'Blogs' page by clicking the 'Blogs' link in the header.
        # Blogs link
        elem = page.get_by_role('link', name='Blogs', exact=True)
        await elem.click(timeout=10000)
        
        # -> Type 'diabetes' into the search field labeled 'Search articles by title or content...' and let the blog list update.
        # Search articles by title or content... text field
        elem = page.get_by_placeholder('Search articles by title or content...', exact=True)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.fill("diabetes")
        
        # --> Assertions to verify final state
        
        # --> Verify filtered blog results are displayed
        await page.locator("xpath=/html/body/div/div/main/div[2]/div/section[3]/div/div/a").nth(0).scroll_into_view_if_needed()
        # Assert: The filtered diabetes article link is visible on the blogs page.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[3]/div/div/a").nth(0)).to_be_visible(timeout=15000), "The filtered diabetes article link is visible on the blogs page."
        # Assert: The search input contains the query 'diabetes'.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[2]/div/div[2]/input").nth(0)).to_have_value("diabetes", timeout=15000), "The search input contains the query 'diabetes'."
        
        # --> Verify irrelevant posts are not shown in the filtered view
        await page.locator("xpath=/html/body/div/div/main/div[2]/div/section[3]/div/div/a").nth(0).scroll_into_view_if_needed()
        # Assert: The diabetes article is visible in the filtered results.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[3]/div/div/a").nth(0)).to_be_visible(timeout=15000), "The diabetes article is visible in the filtered results."
        # Assert: Only one blog result is visible in the filtered view, indicating irrelevant posts are not shown.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[3]/div/div/a")).to_have_count(1, timeout=15000), "Only one blog result is visible in the filtered view, indicating irrelevant posts are not shown."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    