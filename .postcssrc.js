module.exports = {
    plugins: function() {
        require('autoprefixer')({
            "overrideBrowserslist": [
                ">0.25%",
                "not dead"
            ]
        })
    }
}