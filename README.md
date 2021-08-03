# Create React App [![Build Status](https://dev.azure.com/facebook/create-react-app/_apis/build/status/facebook.create-react-app?branchName=main)](https://dev.azure.com/facebook/create-react-app/_build/latest?definitionId=1&branchName=main) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/facebook/create-react-app/blob/main/CONTRIBUTING.md)

<img alt="Logo" align="right" src="https://create-react-app.dev/img/logo.svg" width="20%" />

Create React apps with no build configuration, prepared to work with UI developers tools in IntelliJ IDEA.

- [Creating an App](#creating-an-app) – How to create a new app.
- [Using IntelliJ IDEA tools abilities](#using-intellij-idea-tools-abilities) – How to use IntelliJ IDEA tools abilities.
- [Modifying existing create-react-app application](#modifying-existing-create-react-app-application) – How to modify existing create-react-app application to use IntelliJ IDEA tools abilities.

Create React App works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/facebook/create-react-app/issues/new).<br>

## Quick Overview

```sh
npx @haulmont/create-react-app my-app
cd my-app
npm start
```

If you've previously installed `@haulmont/create-react-app` globally via `npm install -g @haulmont/create-react-app`, we recommend you uninstall the package using `npm uninstall -g @haulmont/create-react-app` or `yarn global remove @haulmont/create-react-app` to ensure that npx always uses the latest version.

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `npm run build`.

### Get Started Immediately

You **don’t** need to install or configure tools like webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

Create a project, and you’re good to go.

## Creating an App

**You’ll need to have Node 14.0.0 or later version on your local development machine** (but it’s not required on the server). We recommend using the latest LTS version. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

To create a new app, you may choose one of the following methods:

### npx

```sh
npx @haulmont/create-react-app my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### npm

```sh
npm init @haulmont/react-app my-app
```

_`npm init <initializer>` is available in npm 6+_

It will create a directory called `my-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
    └── setupTests.js
```

No configuration or complicated folder structures, only the files you need to build your app.<br>
Once the installation is done, you can open your project folder:

```sh
cd my-app
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

<p align='center'>
<img src='https://cdn.jsdelivr.net/gh/marionebl/create-react-app@9f6282671c54f0874afd37a72f6689727b562498/screencast-error.svg' width='600' alt='Build errors'>
</p>

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## Using IntelliJ IDEA tools abilities

Package `@haulmont/create-react-app` creates react app, which pre-prepared to work with IntelliJ IDEA tools.
IntelliJ IDEA tools let you preview and inspect separate components in you react application.
For using it, you need to do next:

1. Import [DevSupport](#devsupport-component) component from `@haulmont/react-ide-toolbox` and wrap your root component into DevSupport
2. Create file with special prepared previews component. This component must content components, which you want to inspect. Every component must be wrapped into [ComponentPreview](#componentpreview-component) (exported from `@haulmont/react-ide-toolbox`) with seted `path` property, in turn, they must be wrapped into uniform component [Previews](#previews-component) (exported from `@haulmont/react-ide-toolbox`).
3. Set component from step 2 to `ComponentPreviews` property of DevSupport component.

After that, IntelliJ IDEA tools will be ready to work.

### Using example

For using example, let view next:

App component renders `FirstComponent`, `SecondComponent` and `ThirdComponent`:

App.js

```
import './App.css';
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";

function App() {
  return (
    <div className="App">
      <FirstComponent/>
      <SecondComponent/>
      <ThirdComponent/>
    </div>
  );
}

export default App;
```

FirstComponent.js

```
function FirstComponent() {
  return (
    <div>
      I am first component
    </div>
  );
}

export default FirstComponent;
```

SecondComponent.js

```
function SecondComponent() {
  return (
    <div>
      I am second component
    </div>
  );
}

export default SecondComponent;
```

ThirdComponent.js

```
function ThirdComponent() {
  return (
    <div>
      I am third component
    </div>
  );
}

export default ThirdComponent;
```

For preview and inspecting `FirstComponent`, `SecondComponent` and `ThirdComponent`, create ComponentPreviews.js:

ComponentPreviews.js

```
import { Previews, ComponentPreview } from "@haulmont/react-ide-toolbox";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";

function ComponentPreviews() {
  return (
    <Previews>
      <ComponentPreview path="/FirstComponent">
        <FirstComponent />
      </ComponentPreview>
      <ComponentPreview path="/SecondComponent">
        <SecondComponent />
      </ComponentPreview>
      <ComponentPreview path="/ThirdComponent">
        <ThirdComponent />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
```

Wrap App component into DevSupport component, and set ComponentPreviews:

index.js:

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DevSupport } from "@haulmont/react-ide-toolbox";
import ComponentPreviews from "./ComponentPreviews";

ReactDOM.render(
  <React.StrictMode>
    <DevSupport
      ComponentPreviews={<ComponentPreviews/>}
    >
      <App />
    </DevSupport>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Now, IntelliJ IDEA tools ready to inspect `FirstComponent`, `SecondComponent` and `ThirdComponent`

### DevSupport Component

`DevSupport` component export form `@haulmont/create-react-app` package. It's purpose is wrapping root react component for working IntelliJ IDEA tools. `DevSupport` component doesn't have any side effects, and your application will be work as usual after wrapping. `DevSupport` has 2 properties:

`ComponentPreviews` - this property await JSX tree value, which wrapped into [Previews](#previews-component) component (look [using example](#using-example))

`useInitialHook` - hook, which executed for init something. It could be hook with login operation for example. This hook must return status object `{loading: boolean, error: boolean}`.

Example:

```
const useLogin = () => {
  const [status, setStatus] = useState({
    loading: true,
    error: false
  });

  useEffect(() => {
    const login = "admin";
    const password = "admin";
    login(login, password)
    .then(() => {
        setStatus({
          error: false,
          loading: false
        });
      })
    .catch(() => {
        setStatus({
          loading: false,
          error: true
        });
      });
  }, []);
  return status;
};

```

### Previews Component

`Previews` component export form `@haulmont/create-react-app` package. It's purpose is wrapping JSX tree (look [using example](#using-example)), which will be passed to `ComponentPreviews` property of [DevSupport](#devsupport-component) component. it is necessary to work of IntelliJ IDEA tools.

### ComponentPreview Component

`ComponentPreview` component export form `@haulmont/create-react-app` package. It's purpose is wrapping component to preview and inspect it (look [using example](#using-example)). `ComponentPreview` has 2 properties:

`path` - this property await string value and this value must be unique among other `ComponentPreview` components.

`propsEditInfo` - this property await object value with structure: `{constrolType, data}`. Is needed for working properties panel editor of IntelliJ IDEA tools.

## Modifying existing create-react-app application

If you already have react application, which created with original `create-react-app` package, you can also using IntelliJ IDEA tools abilities. For theese you need to do next:

1. remove `react-scripts` npm package from your project and install `@haulmont/react-scripts`
2. install `@haulmont/react-ide-toolbox` to your project
3. add next markup to head's inner of `index.html` project's template:

```
<% if (htmlWebpackPlugin.options.isReactIdeDevmode) { %>
    <script src="%PUBLIC_URL%/static/js/devtools-no-server.js"></script>
<% } %>
```

example:

index.html (before):

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

index.html (after):

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <% if (htmlWebpackPlugin.options.isReactIdeDevmode) { %>
      <script src="%PUBLIC_URL%/static/js/devtools-no-server.js"></script>
    <% } %>
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

4. do all steps [from here](#using-intellij-idea-tools-abilities)

## License

Create React App is open source software [licensed as MIT](https://github.com/facebook/create-react-app/blob/main/LICENSE). The Create React App logo is licensed under a [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/).
