import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

/**
 * -----------------------------------------------------------------------------------
 * Google Sheets API Integration
 * -----------------------------------------------------------------------------------
 * 
 * URL: https://docs.google.com/spreadsheets/d/1RPdtaonVneYUWnfxBEOglXhQfKegu-x3CBwiF6TLUbA
 * 
 * To make this work, you need either:
 * 1. A public spreadsheet (Anyone with the link can view) -> Currently it's restricted.
 * 2. A Google Service Account (Recommended for private data).
 * 
 * Instructions for Service Account:
 * 1. Create a Service Account in Google Cloud Console.
 * 2. Generate a JSON Key.
 * 3. Set the variables below in your .env.local file:
 *    GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
 *    GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
 * 4. Share your Google Sheet with the `GOOGLE_SERVICE_ACCOUNT_EMAIL` (Viewer or Editor).
 */

const SPREADSHEET_ID = '1RPdtaonVneYUWnfxBEOglXhQfKegu-x3CBwiF6TLUbA';

export async function getKpiData() {
  try {
    // Check if we have credentials
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn("⚠️ Google Sheets API Keys are missing. Returning mock data.");
      return getMockData();
    }

    // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    
    // Load document properties and worksheets
    await doc.loadInfo(); 
    
    const sheet = doc.sheetsByIndex[0]; // Gets the first sheet
    const rows = await sheet.getRows();

    // Transform rows to match our dashboard data structure
    // Example:
    // const data = rows.map(row => ({
    //   id: row.get('HN'),
    //   name: row.get('Name'),
    //   ...
    // }));

    return rows.map(row => row.toObject());
    
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return getMockData();
  }
}

// Fallback mock data until Google Sheets is fully integrated
function getMockData() {
  return [
    { id: "HN10293", name: "ด.ช. สมชาย ใจดี", age: "5 ขวบ", diagnosis: "Pneumonia", status: "Admitted", date: "06 พ.ค. 2026" },
    { id: "HN10294", name: "ด.ญ. สมหญิง รักเรียน", age: "2 ขวบ", diagnosis: "RSV", status: "Discharged", date: "05 พ.ค. 2026" },
  ];
}
