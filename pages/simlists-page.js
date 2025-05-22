exports.SimPage = class SimPage {

    constructor(page) {
      this.simPackageWrapper = page.locator('.package-list-wrapper')
      this.simPackageItems = page.locator('.sim-item-link');
      this.buyButton = page.getByTestId('esim-button');
      this.simOperaterTitle = page.getByTestId('operator-title');
      this.simCoverageText = page.getByTestId('COVERAGE-row');
      this.simCoverageValue = page.getByTestId('COVERAGE-value');
      this.simDataText = page.getByTestId('DATA-row');
      this.simDataValue = page.getByTestId('DATA-value');
      this.simValidityText = page.getByTestId('VALIDITY-row');
      this.simvalidityValue = page.getByTestId('VALIDITY-value');
      this.simPriceText = page.getByTestId('PRICE-row');
      this.simPriceValue = page.getByTestId('PRICE-value');
    }

    async getSimDetails(index) {
      const getText = async (locator, i = index) => {
        return (await locator.nth(i).innerText()).trim();
      };
      const simDetails = {
        title: await getText(this.simOperaterTitle),
        [await getText(this.simCoverageText)]: await getText(this.simCoverageValue),
        [await getText(this.simDataText)]: await getText(this.simDataValue),
        [await getText(this.simValidityText)]: await getText(this.simvalidityValue),
        [await getText(this.simPriceText)]: await getText(this.simPriceValue),
      };
      console.log("simDetails", simDetails);
      return simDetails;
    }
  
    async selectCountryPackage(index) {
      await this.simPackageWrapper.scrollIntoViewIfNeeded();
      const buyButton = this.buyButton.nth(index);
      // await buyButton.waitFor({ state: 'visible' });
      await buyButton.click();
      return this.getSimDetails(index);
    }
  }