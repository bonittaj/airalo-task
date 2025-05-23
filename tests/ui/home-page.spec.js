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
let isHeadless;

test.beforeAll(async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  isHeadless = browser._options?.headless ?? true;
});

test.beforeEach(async () => {
  page = await context.newPage();
  Home = new HomePage(page)
  Sim = new SimPage(page)
  EsimDetail = new SimDetailPage(page)
  
  await page.goto(`${process.env.BASEURL}`, { waitUntil: 'load' });
  if (!isHeadless) await Home.acceptCookies()
});

test(`esim data vefification: ${validKeyword}`, async () => {
  await expect(await Home.searchBarVisibility()).toBe(true);
  await Home.enterKeyword(`${validKeyword}`)
  await Home.selectCountry(`${validKeyword}`)
  await expect(page).toHaveURL(`${process.env.BASEURL}/${validKeyword.toLowerCase()}-esim`);
  const selectedSimDetails = await Sim.selectCountryPackage(1)
  const confirmedSimData = await EsimDetail.confirmedSimDetails(1)
  expect(selectedSimDetails).toEqual(confirmedSimData)
});
  