# babel-plugin-route-names-chain

## Instructions

npm i babel-plugin-route-names-chain --save

babel.config.js
```
module.exports = {
    plugins: [
        'route-names-chain',
    ],
}
```

## Example

Transforms
```js
const name = RouteNamesChain.Checkin.Profile
```

roughly to
```js
const name = 'Checkin-Prifile'
```

For more examples, please see the catalog test