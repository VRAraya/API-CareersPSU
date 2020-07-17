# Database for an API

## Usage

``` js

const setupDatabase = require('database')

setupDatabase(config).then(db => {
    const { Career } = db
}).catch(err => console.error(err))

```