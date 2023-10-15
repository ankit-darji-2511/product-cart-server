const App = require('../../Root/App');


App.Router.get('/', (req, res) => {
    res.send("Router Called")
})

module.exports = App.Router;