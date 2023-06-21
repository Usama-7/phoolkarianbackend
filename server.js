const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const dbconn = require('./config/db.js');
const authRoute = require('./routes/authRoute.js');
const clientRouter = require('./routes/clientRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const cors = require('cors');

const app = express();

app.use('/uploads', express.static('uploads'));

// config .env
dotenv.config();

// db connection
dbconn();

// cors configuration
app.use(cors());

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/client', clientRouter);
app.use('/api/v1/admin', adminRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgYellow.blue);
});
