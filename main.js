const { app, BrowserWindow, Tray, Menu } = require('electron')

let tray;

const createWindow = () => {

  const mainWindow = new BrowserWindow ({

    width: 800,
    height: 600,

    icon: "FE2.IO_files/FE2Logo.ico",

    webPreferences: {

      nodeIntegration: true,
      devTools: false,

    }

  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('close', (event) => {

    event.preventDefault();
    
    mainWindow.hide();

  });

  mainWindow.loadFile('index.html');

  tray = new Tray('FE2.IO_files/FE2Logo.ico');
  tray.setToolTip('FE2.IO: There is no help here....');
  tray.on('click', () => {

    mainWindow.isVisible()?mainWindow.hide():mainWindow.show();

  });

  const contextMenu = Menu.buildFromTemplate([

    {

      label: 'Show App',

      click: () => {

        mainWindow.show();

      }

    },

    {

      label: 'Quit',

      click: () => {

        app.quit();

      }

    }

  ]);

  tray.on('right-click', () => {

    tray.popUpContextMenu(contextMenu)

  })

};

app.whenReady().then(() => {

  createWindow()

});

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {

      app.quit();

    };

});

app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()

  });