// these tests do not sign in as a user

const SeleniumHelper = require('./selenium-helpers.js');

const {
    clickXpath,
    findByXpath,
    buildDriver
} = new SeleniumHelper();

let rootUrl = process.env.ROOT_URL || 'https://scratch.ly';

jest.setTimeout(60000);

let driver;

describe('www-integration project rows', () => {
    beforeAll(async () => {
        driver = await buildDriver('www-integration project rows');
        // driver.get(rootUrl);
    });

    beforeEach(async () => {
        await driver.get(rootUrl);
    });

    afterAll(async () => await driver.quit());

    test('Featured Projects row title', async () => {
        let projects = await findByXpath('//div[@class="box"]/div[@class="box-header"]/h4');
        let projectsText = await projects.getText();
        await expect(projectsText).toEqual('Featured Projects');
    });

    test('Featured Project link', async () => {
        await clickXpath('//div[@class="box"][descendant::text()="Featured Projects"]' +
            '//div[contains(@class, "thumbnail")][1]/a[@class="thumbnail-image"]');
        let guiPlayer = await findByXpath('//div[@class="guiPlayer"]');
        let guiPlayerDisplayed = await guiPlayer.isDisplayed();
        await expect(guiPlayerDisplayed).toBe(true);
    });

    test('Featured Studios row title', async () => {
        let studios = await findByXpath('//div[@class="box"][2]/div[@class="box-header"]/h4');
        let studiosText = await studios.getText();
        await expect(studiosText).toEqual('Featured Studios');
    });

    test('Featured Studios link', async () => {
        await clickXpath('//div[@class="box"][descendant::text()="Featured Studios"]' +
        '//div[contains(@class, "thumbnail")][1]/a[@class="thumbnail-image"]');
        let studioInfo = await findByXpath('//div[contains(@class, "studio-info")]');
        let studioInfoDisplayed = await studioInfo.isDisplayed();
        await expect(studioInfoDisplayed).toBe(true);
    });
});
