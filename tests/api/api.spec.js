import { test, expect } from '@playwright/test';
import {generateAccessToken} from '../../config/global-setup'
import dotenv from 'dotenv';
dotenv.config();

let newlyCreatedSims = []
let accessToken;

test.beforeAll(async () => {
  accessToken = await generateAccessToken();
});

test.describe('Esim Order placement', () => {
    test('Submit Order for 6 esims', async ({ request }) => {
        const response = await request.post(`${process.env.API_URL}/orders`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                quantity: 6,
                package_id: 'merhaba-7days-1gb',
                type: 'sim',
                description: '2 merhaba-7days-1gb NEU',
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const simData = responseBody.data.sims;
        simData.forEach(sim => newlyCreatedSims.push(sim.id));
    });

    test('Confirm fetch API contains newly ordered esims', async ({ request }) => {
        const response = await request.get(`${process.env.API_URL}/sims`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const simData = responseBody.data;
        const idSet = new Set(simData.map(obj => obj.id));
        const allSimsFound = newlyCreatedSims.every(strId => idSet.has(Number(strId)));
        expect(allSimsFound).toBe(true);
    });

    test('Submit Order for 0 esims', async ({ request }) => {
        const response = await request.post(`${process.env.API_URL}/orders`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            data: {
                quantity: 0,
                package_id: 'merhaba-7days-1gb',
                type: 'sim',
                description: '2 merhaba-7days-1gb NEU',
            }
        });

        expect(response.status()).toBe(422);
        const responseBody = await response.json();
        expect(responseBody.data).toHaveProperty('quantity');
        expect(responseBody.data.quantity).toBe('The quantity must be at least 1.');
    });

    test('Sumit order for 60 products', async ({ request }) => {
        const response = await request.post(`${process.env.API_URL}/orders`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                quantity: 60,
                package_id: 'merhaba-7days-1gb',
                type: 'sim',
                description: 'merhaba-7days-1gb - quantity 60'
            }
        })
        expect(response.status()).toBe(422);
        const responseBody = await response.json();
        expect(responseBody.data).toHaveProperty('quantity');
        expect(responseBody.data.quantity).toBe('The quantity may not be greater than 50.');
    })

    test('Sumit order for invalid package products', async ({ request }) => {
        const response = await request.post(`${process.env.API_URL}/orders`, {
            headers: {
                authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                quantity: 6,
                package_id: 'merhaba-7swqdays-1gb',
                type: 'sim',
                description: 'merhaba-7days-1gb - quantity 60'
            }
        })
        expect(response.status()).toBe(422);
        const responseBody = await response.json();
        expect(responseBody.reason).toBe('The requested eSIM package is invalid or it is currently out of stock. Please try again later.');
    })

    test('Submit order without access token', async ({ request }) => {
        const response = await request.post(`${process.env.API_URL}/orders`, {
            headers: {
                authorization: `Bearer`,
                'Content-Type': 'application/json'
            },
            data: {
                quantity: 60,
                package_id: 'merhaba-7days-1gb',
                type: 'sim',
                description: 'merhaba-7days-1gb - quantity 60'
            }
        })
        expect(response.status()).toBe(401);
    })

});
