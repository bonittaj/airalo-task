import { test, expect, chromium } from '@playwright/test';
import { HomePage } from '../../pages/home-page.js';
import { SimPage } from '../../pages/simlists-page.js';
import { SimDetailPage } from '../../pages/simdetails-page.js'
import {validKeyword, invalidKeyword} from '../../data/constants.js';
import dotenv from 'dotenv';
dotenv.config();

let Home;
let Sim
let browser;
let context;
let page;
let EsimDetail;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
});

test.beforeEach(async () => {
  page = await context.newPage();
  Home = new HomePage(page)
  Sim = new SimPage(page)
  EsimDetail = new SimDetailPage(page)
  await page.goto(`${process.env.BASEURL}`, { waitUntil: 'load' });
  await page.click('#onetrust-accept-btn-handler');
  await page.click("#wzrk-confirm");
});

test(`Verification of Search functionality with valid keyword: ${validKeyword}`, async () => {
  await expect(await Home.searchBarVisibility()).toBe(true);
  await Home.enterKeyword(`${validKeyword}`)
  await Home.selectCountry(`${validKeyword}`)
  await expect(page).toHaveURL(`${process.env.BASEURL}/${validKeyword.toLowerCase()}-esim`);
  const selectedSimDetails = await Sim.selectCountryPackage(1)
  const confirmedSimData = await EsimDetail.confirmedSimDetails(1)
  expect(selectedSimDetails).toEqual(confirmedSimData)
});
  
// test('Verification of Search Field Visibility', async () => {
//     expect(await Home.searchBarVisibility()).toBe(true)
// });

// test('Verification of Search Bar Placeholder Text', async ({ page }) => {
    
// });

// test('Verification of clear functionality', async ({ page }) => {

// });


// test(`Verification of Search functionality with invalid keyword: ${invalidKeyword}`, async () => {
//     await Home.enterKeyword(`${invalidKeyword}`)
// });


// test('Verification of Local/Regional/Global title display', async ({ page }) => {

// });

// test('Page redirection verification', async ({ page }) => {

// });

// test('Verification of page Heading on selecting Japan', async ({ page }) => {

// });

// test('Verification of contents in the first product tile', async ({ page }) => {

// });

// test(`Verification of Package details in order page - ${countryJP}`, async ({ page }) => {
//     expect(await Home.searchBarVisibility()).toBe(true)
//     await Home.enterKeyword(`${countryJP}`)


// });

