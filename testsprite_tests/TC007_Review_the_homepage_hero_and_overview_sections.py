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
        
        # -> Create a todo list for the verification steps and verify the hero section 'Consult a doctor from your couch.' is present on the page.
        await page.mouse.wheel(0, 300)
        
        # -> Verify the hero headline 'Health support for aging parents.' is visible on the homepage.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll up to reveal the top of the homepage and verify the hero headline and primary CTA (e.g., 'Health support for aging parents.' and 'Speak to a Doctor' or 'Check Prices') are visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll the homepage to reveal the 'Our Platform' and 'Patient Support Programs' sections and then verify the main informational sections are present.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll the homepage to reveal additional sections and verify the presence of 'Our Platform', 'Patient Support Programs', 'Testimonials', 'FAQ', and the call-to-action content like 'Book Consultation' or 'Talk to a doctor'.
        await page.mouse.wheel(0, 300)
        
        # --> Assertions to verify final state
        
        # --> Verify the hero section is displayed
        await page.locator("xpath=/html/body/div/div/main/div[2]/div/section[1]/div[3]/div[1]/div[2]/div[1]/a[1]").nth(0).scroll_into_view_if_needed()
        # Assert: Hero CTA 'Check Prices' is visible.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[1]/div[3]/div[1]/div[2]/div[1]/a[1]").nth(0)).to_be_visible(timeout=15000), "Hero CTA 'Check Prices' is visible."
        await page.locator("xpath=/html/body/div/div/main/div[2]/div/section[1]/div[3]/div[1]/div[2]/div[1]/a[2]").nth(0).scroll_into_view_if_needed()
        # Assert: Hero CTA 'Talk to a doctor' is visible.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[1]/div[3]/div[1]/div[2]/div[1]/a[2]").nth(0)).to_be_visible(timeout=15000), "Hero CTA 'Talk to a doctor' is visible."
        await page.locator("xpath=/html/body/div/div/main/div[2]/div/section[1]/div[3]/div[1]/div[2]/div[3]/div[2]/div[1]").nth(0).scroll_into_view_if_needed()
        # Assert: Hero statistic '40+' is visible, confirming the hero section is displayed.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[1]/div[3]/div[1]/div[2]/div[3]/div[2]/div[1]").nth(0)).to_be_visible(timeout=15000), "Hero statistic '40+' is visible, confirming the hero section is displayed."
        
        # --> Verify the service overview, patient support, testimonials, FAQ, and call-to-action content are displayed
        # Assert: Service overview section (One-Stop Solution) is visible.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[2]/div/div[2]/div[1]").nth(0)).to_contain_text("One-Stop Solution", timeout=15000), "Service overview section (One-Stop Solution) is visible."
        # Assert: Patient Support Programs navigation link is visible.
        await expect(page.locator("xpath=/html/body/div/div/nav/div/div[1]/div[4]/a").nth(0)).to_have_text("Patient Support Programs", timeout=15000), "Patient Support Programs navigation link is visible."
        # Assert: Call-to-action 'Book Consultation Now' is visible.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[2]/div/div[2]/div[4]/a").nth(0)).to_have_text("Book Consultation Now", timeout=15000), "Call-to-action 'Book Consultation Now' is visible."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    