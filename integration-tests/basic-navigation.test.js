const portFinder = require('portfinder')
const puppeteer = require('puppeteer')

const app = require('../meadowlark.js')


let server = null
let port = null

beforeEach(async() =>{
    port = await portFinder.getPortPromise()
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

test('home page links to about page', async() =>{
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]'),
    ])
    expect(page.url()).toBe(`https://localhose:${port}/about`)
    await browser.close()
})