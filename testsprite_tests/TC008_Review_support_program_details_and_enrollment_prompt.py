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
        
        # -> Click the 'Patient Support Programs' link in the top navigation to open the Patient Support Programs page.
        # Patient Support Programs link
        elem = page.get_by_text('Blogs', exact=True).locator("xpath=ancestor-or-self::*[.//a][1]").get_by_role('link', name='Patient Support Programs', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Schedule Consultation' link to reach the enrollment call-to-action.
        # Schedule Consultation link
        elem = page.get_by_text('Explore Delivery Model', exact=True).locator("xpath=ancestor-or-self::*[.//a][1]").get_by_role('link', name='Schedule Consultation', exact=True)
        await elem.click(timeout=10000)
        
        # -> Switch to the 'Patient Support Programs' tab and verify the program description and the 'Schedule Consultation' enrollment call-to-action are visible.
        # Switch to tab C80B
        page = context.pages[-1]  # switch to most recently active tab
        
        # --> Assertions to verify final state
        
        # --> Verify the patient support program information is displayed
        # Assert: The 'What is a Patient Support Program?' section heading is visible on the page.
        await expect(page.locator("xpath=/html/body/div").nth(0)).to_contain_text("What is a Patient Support Program?", timeout=15000), "The 'What is a Patient Support Program?' section heading is visible on the page."
        # Assert: The explanatory paragraph describing what a Patient Support Program is appears on the page.
        await expect(page.locator("xpath=/html/body/div").nth(0)).to_contain_text("A Patient Support Program (PSP) is a privately operated service designed to assist patients who have been prescribed specific pharmaceutical therapies.", timeout=15000), "The explanatory paragraph describing what a Patient Support Program is appears on the page."
        
        # --> Verify the enrollment call to action is visible
        await page.locator("xpath=/html/body/div/div/main/div[2]/div/section[1]/div[4]/div/div[1]/div[2]/a[1]").nth(0).scroll_into_view_if_needed()
        # Assert: The enrollment call-to-action 'Schedule Consultation' is visible on the page.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[1]/div[4]/div/div[1]/div[2]/a[1]").nth(0)).to_be_visible(timeout=15000), "The enrollment call-to-action 'Schedule Consultation' is visible on the page."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    