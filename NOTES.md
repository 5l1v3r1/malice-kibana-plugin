# NOTES

## UI Ideas

### Grids

- <https://github.com/haltu/muuri>
- <https://github.com/STRML/react-grid-layout>

### Viz

- https://www.elastic.co/blog/custom-vega-visualizations-in-kibana

## development (without **blacktop/kibana-plugin-builder**)

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following yarn scripts.

- `yarn kbn bootstrap`

  Install dependencies and crosslink Kibana and all projects/plugins.

  > **_IMPORTANT:_** Use this script instead of `yarn` to install dependencies when switching branches, and re-run it whenever your dependencies change.

- `yarn start`

  Start kibana and have it include this plugin. You can pass any arguments that you would normally send to `bin/kibana`

  ```sh
  yarn start --elasticsearch.url http://localhost:9220
  ```

- `yarn build`

  Build a distributable archive of your plugin.

- `yarn test:browser`

  Run the browser tests in a real web browser.

- `yarn test:server`

  Run the server tests using mocha.

For more information about any of these commands run `yarn ${task} --help`. For a full list of tasks checkout the `package.json` file, or run `yarn run`.
