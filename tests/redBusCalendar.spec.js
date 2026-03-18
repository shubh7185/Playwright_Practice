const { test, expect } = require('@playwright/test');


test('Calendar automation', async ({ page }) => {
    const targetMonth = 'March';
    const targetYear = '2026';
    const targetDate = '20';

    await page.goto("https://www.redbus.in/");


    await page.getByRole('combobox', { name: 'From' }).fill("Dehradun");
    await page.getByRole('option', { name: 'Dehradun' }).first().click();
    // await page.waitForSelector('[role="option"]');
    // const from = await page.locator("div[role*='heading']").count();

    // for (let i = 0; i < from; i++) {
    //     const text = await page.locator("div[role*='heading']").nth(i).textContent();
    //     if (text === "Dehradun") {
    //         await page.locator("div[role*='heading']").nth(i).click();
    //         break;

    //     }
    // }

    await page.getByRole('combobox', { name: 'To' }).fill('Lucknow');
    await page.getByRole('option', { name: 'Lucknow' }).first().click();
    // const to = await page.locator(".leftListCont___d9068f").count();

    // for (let i = 0; i < to; i++) {
    //     const text = await page.locator("div[role*='heading']").nth(i).textContent();
    //     if (text === "Agra") {
    //         await page.locator("div[role*='heading']").nth(i).click();
    //         break;

    //     }
    // }


    await page.locator('[class*="dateInputWrapper"]').click();
    while (true) {
        const currentMonthtext = (await page.locator("p[class*='monthYear']").textContent()).trim();
        if (currentMonthtext.includes(targetMonth) && currentMonthtext.includes(targetYear)) {
            break;
        }

        await page.getByRole('button', { name: "Next month" }).click();

    }

    await page.locator("li[class*='dateItem']", { hasText: targetDate }).click();


    await page.getByRole('button', { name: 'Search buses' }).click();
    await page.locator("li[class*='tupleWrapper']").first().waitFor();

    const ratingSort = page.locator("[role='radiogroup'] [aria-label*='Ratings']");
    const label = await ratingSort.getAttribute('aria-label');
    await ratingSort.click();
    if (!label?.toLowerCase().includes('descending')) {
        await ratingSort.click();
    }

    const priceSort = page.locator("[role='radiogroup'] [aria-label*='Price']")
    const Pricelabel = await priceSort.getAttribute('aria-label');
    await priceSort.click();
    if (!Pricelabel?.toLowerCase('descending')) {
        await priceSort.click();
    }

    // await page.locator().scrollIntoViewIfNeeded();

    const buses = page.locator("li[class*='tupleWrapper']");

    await buses.first().waitFor({ state: "visible" });

    let previousCount = 0;

    while (true) {
        const currentCount = await buses.count();

        if (currentCount === previousCount) break;

        previousCount = currentCount;

        await page.mouse.wheel(0, 3000);

        await page.waitForTimeout(1000);
    }

    const totalBuses = await buses.count();
    console.log("Total Buses loaded:", totalBuses);

    let BestBus = {
        index: -1,
        rating: 0,
        price: Number.MAX_VALUE,
        name: ""
    };

    for (let i = 0; i < totalBuses; i++) {
        const bus = buses.nth(i);
        const busName = await bus.locator("[class*='travelsName']").textContent();
        const ratingOfBus = await bus.locator("[class*='ratingTag']").textContent();
        const ticketPrice = await bus.locator("[class*='finalFare']").textContent();
        if (!ratingOfBus || !ticketPrice) continue;

        // Extract ONLY decimal rating like 4.71
        const ratingMatch = ratingOfBus.match(/\d+\.\d+/);
        if (!ratingMatch) continue;

        const rating = parseFloat(ratingMatch[0]); const price = parseInt(ticketPrice.replace(/[^\d]/g, ""));
        console.log("Bus Name", busName);
        console.log("Rating", rating);
        console.log("Ticket Price", price);
        if (
            BestBus.index === -1 ||
            rating > BestBus.rating ||
            (rating === BestBus.rating && price < BestBus.price)
        ) {
            BestBus = {
                index: i,
                rating,
                price,
                name: busName
            };
        }
    }

    console.log("*****************************")
    console.log("Best Bus Found ", BestBus);

    if (BestBus.index != -1) {
        await buses.nth(BestBus.index).locator('button[aria-label*="View seats"]').click();
    }


    const NumberOfSeatsSelect = 1;
    let selectedCount = 0;

    await page.waitForSelector('[role="button"][aria-label*="Seat number"]');
    const seats = page.locator('[role="button"][aria-label*="Seat number"]');
    const TotalSeats = await seats.count();
    console.log("Total Seats ", TotalSeats);

    for (let i = 0; i < TotalSeats; i++) {
        if (selectedCount >= NumberOfSeatsSelect) {
            break;
        }
        const seat = seats.nth(i);
        const label = await seat.getAttribute("aria-label");

        if (!label) continue;


        if (label.toLowerCase().includes("available")) {
            console.log("Selecting seats: ", label);
            await seat.click();
            selectedCount++;
        }


    }

    console.log("Selected Seats: ", selectedCount);

    // await page.pause();

    const boardingButton = page.locator(
        'button[aria-label="Select boarding & dropping points"]'
    );

    await boardingButton.waitFor({ state: 'visible' });

    await boardingButton.click();

    // await page.waitForSelector('text=2. Board/Drop point');

    // Wait for boarding group to be attached to DOM
    // await page.waitForSelector('[aria-label="Boarding points"]', { state: 'attached' });

    // Small stabilization delay (important for React animations)
    await page.waitForTimeout(700);

    const ParentBoardingPoint = await page.locator(".bpdpList___9e7995 ").first();
    await ParentBoardingPoint.locator(".bpdp").first().click();

    // const boardingRadio = page
    //   .getByRole('radiogroup', { name: 'Boarding points' })
    //   .getByRole('radio')
    //   .first();

    // if (!(await boardingRadio.isChecked())) {
    //     await boardingRadio.click();
    // }
    // // Click dropping radio
    // const droppingRadio = page
    //     .getByRole('radiogroup', { name: 'Dropping points' })
    //     .getByRole('radio')
    //     .first();

    // await droppingRadio.waitFor({ state: 'visible' });
    // await droppingRadio.click();



    // Now click Fill Passenger button
    const passengerButton = page.locator(
        "button[aria-label*='Fill passenger details']"
    );

    await passengerButton.waitFor({ state: 'visible' });
    await passengerButton.click();

    await page.locator("input[placeholder*='Phone']").fill("8279456190");
    await page.locator("input[placeholder*='Enter email id']").fill("Aditi123@gmail.com");
    console.log("*****************", await page.locator('[role="combobox"]').count());

    await page.locator('div:has-text("State of Residence")')
        .locator('[role="combobox"]')
        .click();

    // await page.getByRole('combobox',{name:'State of Residence'}).click();
    await page.locator('div[aria-label*="Select state of residence"]').waitFor();
    await page.locator("input[placeholder='Search for state']").fill("Uttarakhand");
    await page.getByRole('radio', { name: 'Uttarakhand' }).click();






    // await page.getByRole('radio', { name: "Price" }).click();

    // await page.pause();
})