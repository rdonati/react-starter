How to use:

1. Clone repository `git clone https://github.com/rdonati/react-starter.git <target_directory_name>`
2. Run `yarn install --check-files` to install dependencies
3. Create MongoDB database with table to match models/User.js
4. Create keys.js file for sensitive info `touch config/keys.js' and add

```
module.exports = {
  mongoURI: <mongoURI>,
  secretOrKey: <secret>,
}
```
