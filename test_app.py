import asyncio
from playwright.async_api import async_playwright

async def run_tests():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        # 1. Open the website
        await page.goto("http://localhost:8000")
        print("Page loaded")
        await page.wait_for_selector(".hero-title")

        # Verify title
        title = await page.title()
        print("Title:", title)
        assert "KINGSMAN" in title

        # 2. Test Category Filtering
        print("Testing filter...")
        # Click on 'Smoking / Tantanali'
        tuxedo_btn = page.locator('button.filter-btn[data-category="tuxedo"]')
        await tuxedo_btn.click()
        await page.wait_for_timeout(300)
        cards = page.locator(".product-card")
        count = await cards.count()
        print(f"Smoking cards count: {count}")
        assert count == 2

        # Click back to All
        all_btn = page.locator('button.filter-btn[data-category="all"]')
        await all_btn.click()
        await page.wait_for_timeout(300)
        assert await cards.count() == 9

        # 3. Test Search
        print("Testing search...")
        search_input = page.locator("#searchInput")
        await search_input.fill("Royal Navy")
        await page.wait_for_timeout(300)
        assert await cards.count() == 1
        await search_input.fill("")
        await page.wait_for_timeout(300)
        assert await cards.count() == 9

        # 4. Open Product Detail Modal
        print("Testing product detail modal...")
        first_quick_view = page.locator(".quick-view-btn").first
        await first_quick_view.click()
        await page.wait_for_selector("#productModal.active")

        # Select size and add to cart
        size_btn = page.locator("#sizeOptions .size-btn").nth(1)
        await size_btn.click()
        modal_add_btn = page.locator("#productModalBody .btn-gold")
        await modal_add_btn.click()
        await page.wait_for_timeout(400)

        # Check cart count badge
        cart_badge = page.locator("#cartCount")
        badge_val = await cart_badge.text_content()
        print(f"Cart count badge: {badge_val}")
        assert badge_val == "1"

        # 5. Quick Add another item
        add_btn = page.locator(".add-to-cart-btn").nth(2)
        await add_btn.click()
        await page.wait_for_timeout(300)
        assert await cart_badge.text_content() == "2"

        # 6. Open Cart Drawer and verify
        cart_btn = page.locator("#openCartBtn")
        await cart_btn.click()
        await page.wait_for_selector("#cartDrawer.active")
        cart_items = page.locator(".cart-item")
        assert await cart_items.count() == 2

        # 7. Proceed to Checkout
        checkout_btn = page.locator("#proceedCheckoutBtn")
        await checkout_btn.click()
        await page.wait_for_selector("#checkoutModal.active")

        # Fill order form
        await page.locator("#orderName").fill("Azizbek Toshmatov")
        await page.locator("#orderPhone").fill("+998901234567")
        await page.locator("#orderAddress").fill("Toshkent sh., Yunusobod 4-mavze 12-uy")

        # Submit order
        await page.locator("#submitOrderBtn").click()
        await page.wait_for_selector(".checkout-status.success")
        print("Order placed successfully!")

        # 8. Test Fitting / Consultation Form
        print("Testing consultation form...")
        await page.locator("#closeCheckoutModal").click()
        await page.evaluate("window.scrollTo(0, document.querySelector('#fitting').offsetTop)")
        await page.wait_for_timeout(500)

        await page.locator("#fitName").fill("Dilshod Qodirov")
        await page.locator("#fitPhone").fill("+998911112233")
        await page.locator("#fitComment").fill("Bespoke uch qismli to'y kostyumi uchun o'lcham olish kerak")
        await page.locator("#submitFitBtn").click()
        await page.wait_for_selector("#formStatus.success")
        print("Consultation submitted successfully!")

        # Scroll to top and take hero screenshot
        await page.evaluate("window.scrollTo({top: 0, behavior: 'instant'})")
        await page.wait_for_timeout(800)
        await page.screenshot(path="screenshot_hero.png", full_page=False)

        # Scroll to catalog and take catalog screenshot
        await page.evaluate("window.scrollTo(0, document.querySelector('#catalog').offsetTop)")
        await page.wait_for_timeout(600)
        await page.screenshot(path="screenshot_catalog.png")

        await browser.close()
        print("All Playwright verification tests passed!")

if __name__ == "__main__":
    asyncio.run(run_tests())
