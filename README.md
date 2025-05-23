#  Airalo UI & API Automation

This repository contains automated test cases for [Airalo](https://www.airalo.com) covering both UI and API layers. The automation is implemented using **Playwright** and **JavaScript**, following best practices like the **Page Object Model (POM)** and CI/CD integration with GitHub Actions.

---

## Key Features

- **UI Test Automation** using Playwright  
- **API Test Automation** using Playwright Test and REST API  
- **Structured with Page Object Model (POM)**  
- **CI/CD Integration** with GitHub Actions  
- **.env support** for managing sensitive credentials  

---

## Implementation Approach

- **Requirement Analysis** – Understand the application's UI flow and API functionality  
- **Test Case Design** – Define test scenarios covering positive, negative, and edge cases  
- **Framework Selection** – Chose Playwright for unified UI and API automation  
- **POM Implementation** – Applied Page Object Model to structure UI tests efficiently  
- **Reporting** – Integrated Allure for test reports  
- **CI/CD Setup** – Configured GitHub Actions to trigger tests automatically on commits and pull requests  

---

## Setup Instructions

### Prerequisites
- Ensure **Node.js** and **npm** are installed

### Installation
```bash
git clone https://github.com/bonittaj/airalo-task.git
cd airalo-task

npm install
```
### Environment Setup
**Update the .env file with your CLIENT_ID and CLIENT_SECRET
```bash
npm run test:ui        # Run UI tests  
npm run test:api       # Run API tests  
npm run test:all       # Run all tests  
```
