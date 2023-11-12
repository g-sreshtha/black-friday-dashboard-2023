# About your dashboard

### Deployment

You will deploy the site to the Altitude platform, configs are provided to make this easier - feel free to read / understand them

### CI / CD

We have provided some files that tell github how to check your code, these will run on pull request to the main branch.

It's possible to use the Altitude CLI to automate deployment without needing to head to the UI.

### Dependencies

Feel free to install and use any dependencies that you need. We have included `@microsoft/fetch-event-source` by default as you will need this to consume from the data source

### Available commands

`dev` - run the app in development mode
`build` - build the app for production
`lint` - check that best practices are being followed
`check:style` - checks your code follows the style required by your team (prettier)
`fix:style` - makes changes to files that don't match this style
`test` - can be used to execute tests, you will need to set this up
