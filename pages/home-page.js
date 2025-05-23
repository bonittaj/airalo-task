
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchField = page.getByPlaceholder('Search data packs for 200+ countries and regions');
    this.emptyCountryListMessage = page.locator('.li').getByText('No Countries Available');
    this.selectedDropdownText = page.getByTestId('Japan-name');
  }

  async searchBarVisibility() {
    return await this.searchField.isVisible();
  }

  async enterKeyword(keyword) {
    await this.waitForVisible(this.searchField);
    await this.searchField.click();
    await this.searchField.fill(keyword);
  }

  async selectCountry() {
    await this.waitForVisible(this.selectedDropdownText);
    await this.selectedDropdownText.nth(0).click();
  }
}
