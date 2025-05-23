import { BasePage } from "./base-page";

export class SimDetailPage extends BasePage {

    constructor(page) {
      super(page);
      this.simOperaterTitle = page.getByTestId('sim-detail-operator-title');
      this.simCoverageText = page.locator('.package-list-detail [data-testid="COVERAGE-row"]');
      this.simCoverageValue = page.locator('.package-list-detail [data-testid="COVERAGE-value"]');
      this.simPackageItems = page.locator('.sim-item-link');
      this.simDataText = page.locator('.package-list-detail [data-testid="DATA-row"]');
      this.simDataValue = page.locator('.package-list-detail [data-testid="DATA-value"]');
      this.simValidityText = page.locator('.package-list-detail [data-testid="VALIDITY-row"]');
      this.simvalidityValue = page.locator('.package-list-detail [data-testid="VALIDITY-value"]');
      this.simPriceText = page.locator('.package-list-detail [data-testid="PRICE-row"]');
      this.simPriceValue = page.locator('.package-list-detail [data-testid="PRICE-value"]');
    }

    async getSimDetails() {
      const getText = async (locator) => {
        return (await locator.innerText()).trim();
      };
      const simDetails = {
        title: await getText(this.simOperaterTitle),
        [await getText(this.simCoverageText)]: await getText(this.simCoverageValue),
        [await getText(this.simDataText)]: await getText(this.simDataValue),
        [await getText(this.simValidityText)]: await getText(this.simvalidityValue),
        [await getText(this.simPriceText)]: await getText(this.simPriceValue),
      };
      return simDetails;
    }
  
    async confirmedSimDetails(index) {
      return await this.getSimDetails(index)
    }
  }