// services/googleSheets.ts
import { google } from "googleapis";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const CREDENTIALS_PATH = process.env.CREDENTIALS_PATH || path.join(process.cwd(), "credentials.json");
const SPREADSHEET_ID = process.env.SPREADSHEET_ID; // ID de tu Google Sheet

// Inicializa cliente con Service Account
const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

export async function readKPIs(): Promise<Record<string, string | undefined>[]> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID!,
    range: "KPIs!A1:D", // Ajusta rango o tabla
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return [];
  
  const [headers, ...dataRows] = rows;
  return dataRows.map((r) =>
    Object.fromEntries(headers.map((h, i) => [String(h).trim(), r[i]]))
  );
}

export async function updateKPI(row: number, column: string, value: string | number) {
  // Column: A, B, C, ...
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID!,
    range: `KPIs!${column}${row}`,
    valueInputOption: "RAW",
    requestBody: { values: [[value]] },
  });
  return res.data;
}
