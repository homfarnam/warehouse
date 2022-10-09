#  WareHouse Front-end


 
This app is a project that it's working with a warehouse API that it provided by a Node js local server with some data.
The main goal of the frontend is to list the available products and quantities, and the articles in each product. The user should be able to register a sale, and the inventory should be updated accordingly.

###

I wrote all the API's for the frontend even for those I didn't use them, I mentioned in tasks list down here about future options that can make this project better.


## Installation
You can install the dependencies with these commands.

npm:

```bash
npm install
```

yarn:

```bash
yarn
```

## Deployment

To Start this project run

npm:

```bash
npm run start
```

yarn:

```bash
yarn start
```

To build the project run:

npm:

```bash
npm run build
```

yarn:

```bash
yarn build
```

## Testing

To test the project run:

npm:

```bash
npm run test
```

yarn:

```bash
yarn test
```
 
## Tech Stack

**Client:** React, Typescript, SCSS, TailwindCSS

**Tests:** React testing library, Jest


## Tests

For the unit tests, I used react testing library and jest to test some components and hooks and api to make sure that the app is working correctly and there is no issues with that.
I used jest to mock axios and my custom axios interceptor that it customized for this specific project that it can handle a unreliable API.



## Tasks list

Some more options could make this app better but I had no time for that, I can make them in the future.

- [ ] Create different forms to create a product, article and sales
- [ ] Create pages for one product, one article, one sale
- [ ] Enable editing products, articles and sales data with a form and update them
- [ ] Make a comparision between current data and API data to change current data with new one (if new one exist)
 


