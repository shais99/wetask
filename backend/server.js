const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
var io = require('socket.io')(http);

// Express App Config
app.use(cookieParser())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(session({
    secret: 'MyS@CR@TC0dE1908ItsoNlyMiNE',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const authRoutes = require('./api/auth/auth.routes')
const boardRoutes = require('./api/board/board.routes')
const userRoutes = require('./api/user/user.routes')
const connectSockets = require('./api/socket/socket.routes')



app.use('/api/auth', authRoutes)
app.use('/api/boards', boardRoutes)
app.use('/api/users', userRoutes)
connectSockets(io)











const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});