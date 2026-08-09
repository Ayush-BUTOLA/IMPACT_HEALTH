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
        
        # -> Click the 'About' link in the top navigation to open the About page.
        # About link
        elem = page.locator('xpath=/html/body/div/div/nav/div/div/div[2]/a')
        await elem.click(timeout=10000)
        
        # -> Dismiss the Services dropdown (if present) then scroll the About page to reveal the 'team' and healthcare commitment content.
        await page.mouse.wheel(0, 300)
        
        # -> Dismiss the Services dropdown by clicking the 'Services' button in the header so the About page content is no longer blocked.
        # Services button
        elem = page.get_by_role('button', name='Services', exact=True)
        await elem.click(timeout=10000)
        
        # -> Scroll the About page to reveal the 'Team' section and then locate the 'Team' and healthcare-related content on the page.
        await page.mouse.wheel(0, 300)
        
        # -> Click the 'Services' button to close the Services dropdown, then scroll the About page and search for 'Team' and 'healthcare' content to verify they are visible.
        # Services button
        elem = page.get_by_role('button', name='Services', exact=True)
        await elem.click(timeout=10000)
        
        # -> Click the 'Services' button to close the Services dropdown, then scroll the About page and search for 'Team' and 'healthcare' content to verify they are visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll the About page to reveal the 'Team' section and verify the Team and healthcare-commitment content are visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll the About page to reveal the 'Team' section and verify the Team and healthcare commitment content are visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll to the bottom of the About page to reveal the 'Team' section and confirm the team information is visible.
        await page.mouse.wheel(0, 300)
        
        # -> Scroll down the About page so the 'Founder & CEO' founder card (team) and the 'Our Impact & Scale' (healthcare) section are visible for verification.
        await page.mouse.wheel(0, 300)
        
        # --> Assertions to verify final state
        
        # --> Verify the team information and healthcare commitment content are displayed
        # Assert: Team information showing 'Anshuman Sahoo Founder & CEO' is visible.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[6]/div/div/div/div[1]/div").nth(0)).to_contain_text("Anshuman Sahoo Founder & CEO", timeout=15000), "Team information showing 'Anshuman Sahoo Founder & CEO' is visible."
        # Assert: Healthcare-related content ("Patient Care") is visible on the page.
        await expect(page.locator("xpath=/html/body/div/div/main/div[2]/div/section[5]/div/div[2]/div[3]").nth(0)).to_contain_text("Patient Care", timeout=15000), "Healthcare-related content (\"Patient Care\") is visible on the page."
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    