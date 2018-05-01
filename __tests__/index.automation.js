/* eslint-env jest */
import puppeteer from 'puppeteer'

const automationTimeOut = 30000
let page
let browser

beforeAll(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
})

describe('Automation: Home Page Tests', () => {
  it('Returns Weather Results After Clicking Search with a Correctly Defined City', async () => {
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })
    await page.focus('#capture_searchterm')
    await page.type('#capture_searchterm', 'edinburgh')
    await page.click('#capture_submit')
    await page.waitForSelector('#search-results')
    const patterns = await page.evaluate(() => {
      const segments = Array.from(document.querySelectorAll('.weather-item_3hr'))
      return segments.map(segment => segment.textContent)
    })
    expect(patterns.length).toBeGreaterThan(0)
  }, automationTimeOut)

  it('Fails if Incorrect City is Defined', async () => {
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })
    await page.focus('#capture_searchterm')
    await page.type('#capture_searchterm', 'blalbla')
    await page.click('#capture_submit')
    let message
    try {
      await page.waitForSelector('#search-results', { timeout: 2000 })
    } catch (error) {
      message = error.message
    }
    expect(message).toBe('waiting for selector \"#search-results\" failed: timeout 2000ms exceeded')
  }, automationTimeOut)
})

afterAll(async () => {
  await browser.close()
})
