// These tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickXpath,
    findByXpath,
    buildDriver
} = new SeleniumHelper();

let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

jest.setTimeout(60000);

let driver;

describe('www-integration navbar links', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration navbar links');
    });

    beforeEach(async () => {
        await driver.get(rootUrl);
    });

    afterAll(async () => await driver.quit());

    test('Check text of navbar items', async () => {
        let create = await findByXpath('//li[@class="link create"]');
        let createText = await create.getText();
        await expect(createText).toEqual('Create');

        let explore = await findByXpath('//li[@class="link explore"]');
        let exploreText = await explore.getText();
        await expect(exploreText).toEqual('Explore');

        let ideas = await findByXpath('//li[@class="link ideas"]');
        let ideasText = await ideas.getText();
        await expect(ideasText).toEqual('Ideas');

        let about = await findByXpath('//li[@class="link about"]');
        let aboutText = await about.getText();
        await expect(aboutText).toEqual('About');

        let join = await findByXpath('//a[@class="registrationLink"]');
        let joinText = await join.getText();
        await expect(joinText).toEqual('Join Scratch');

        let signIn = await findByXpath('//li[@class="link right login-item"]/a');
        let signInText = await signIn.getText();
        await expect(signInText).toEqual('Sign in');
    });

    test('create when signed out', async () => {
        await clickXpath('//li[@class="link create"]');
        let gui = await findByXpath('//div[contains(@class, "gui")]');
        let guiVisible = await gui.isDisplayed();
        await expect(guiVisible).toBe(true);
    });

    test('Explore link when signed out', async () => {
        await clickXpath('//li[@class="link explore"]');
        let banner = await findByXpath('//h1[@class="title-banner-h1"]');
        let bannerText = await banner.getText();
        await expect(bannerText).toEqual('Explore');
    });

    test('Ideas link when signed out', async () => {
        await clickXpath('//li[@class="link ideas"]');
        let banner = await findByXpath('//div[contains(@class, "ideas-banner")]');
        let bannerVisible = await banner.isDisplayed();
        await expect(bannerVisible).toBe(true);
    });

    test('About link when signed out', async () => {
        await clickXpath('//li[@class="link about"]');
        let aboutPage = await findByXpath('//div[@class="inner about"]');
        let aboutPageVisible = await aboutPage.isDisplayed();
        await expect(aboutPageVisible).toBe(true);
    });

    test('Search Bar', async () => {
        let searchBar = await findByXpath('//div[contains(@class, "search-wrapper")]/div/input');
        await searchBar.sendKeys('cat');
        await driver.sleep(500); // without it sends an empty string on submit
        await searchBar.submit();
        let banner = await findByXpath('//h1[@class="title-banner-h1"]');
        let bannerText = await banner.getText();
        await expect(bannerText).toEqual('Search');
    });

    test('Scratch Logo', async () => {
        await clickXpath('//li[@class="link explore"]');
        await findByXpath('//h1[@class="title-banner-h1"]');
        await clickXpath('//li[@class="logo"]');
        let splash = await findByXpath('//div[@class="splash"]');
        let splashVisible = await splash.isDisplayed();
        expect(splashVisible).toBe(true);
    });

    // Sign In is tested in sign-in-and-out tests
    // Create Account is tested in Join tests
});
