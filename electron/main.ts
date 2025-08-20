import { app, BrowserWindow, screen } from "electron";
import * as path from "path";
import next from "next";
import { createServer } from "http";
import dotenv from 'dotenv'

let win: BrowserWindow | null = null;
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const PORT = process.env.PORT || "3000";

async function createWindow() {
    //Iniciar Next como librería
    const nextApp = next({
        dev: false, // importante: producción
        dir: path.join(__dirname, ".."), // apunta a la raíz del proyecto
    });

    const handle = nextApp.getRequestHandler();
    await nextApp.prepare();

    // Levantar servidor HTTP con Next
    const server = createServer((req, res) => {
        handle(req, res);
    });

    server.listen(PORT, () => {
        console.log(`Next.js running on http://localhost:${PORT}`);
    });

    process.env.CREDENTIALS_PATH = path.join(app.getAppPath(), "credentials.json");

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // Crear ventana de Electron transparente
    win = new BrowserWindow({
        width: 450,
        height: 800,
        x: width - 450, // posición horizontal (pegado a la derecha)
        y: 0,
        show: false,
        frame: false,
        titleBarStyle: "hiddenInset",
        transparent: true,
        backgroundColor: "#00000000",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
        },
    });

    // 4) Cargar la app Next dentro de Electron
    await win.loadURL(`http://localhost:${PORT}`);
    win.show();

}



app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
