const { app, BrowserWindow } = require('electron')
const express = require('express')();
const http = require('http').Server(express);
const io = require('socket.io')(http);

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('user',"hello user");
  });
  
  http.listen(3000, () => {
    console.log('listening on *:3000');
  });