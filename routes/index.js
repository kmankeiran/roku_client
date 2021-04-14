const express = require('express');
const router = express.Router();

// this is where we would add our middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

router.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000',
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}))

// ums = User Management System. This router is for managing the users while the other one is for the movie data
router.use('/ums', createProxyMiddleware({
    target: 'http://localhost:5000',
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}))

router.get('/', (req, res) => {
    res.render('index', { message: "Hello from handlebars!" });
})

// other routes you might use
router.use((req, res) => {
    res.status(404);
    res.render("error", { 
        layout: "errorLayout.hbs", errormessage: `You've lost your way, traveler! "${req.url}" doesn't exist!`
    });
})

module.exports = router;