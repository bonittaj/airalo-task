exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page
    this.searchField = page.getByPlaceholder('Search data packs for 200+ countries and regions')
    this.emptyCountryListMessage = page.locator('.li').getByText('No Countries Available');
    this.text = page.getByText('Japan')
    this.selectedDropdownText = page.getByTestId(`Japan-name`).nth(0)
  }

  async goToHomePage() {
    await this.page.goto('https://www.airalo.com/');
  }
  async searchBarVisibility() {
    return await this.searchField.isVisible();
  }

  async enterKeyword(keyword) {
    await this.searchField.isVisible();
    await this.searchField.click();
    await this.searchField.fill(keyword);
  }
  async selectCountry(keyword) {
    await this.page.waitForTimeout(4000);
    await this.selectedDropdownText.waitFor({ state: 'visible' });
    await this.selectedDropdownText.waitFor({ state: 'attached' }); // ensures element is in DOM
    await this.selectedDropdownText.click();
    await this.page.waitForTimeout(4000);
  }
}