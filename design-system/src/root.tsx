import { component$, useStyles$ } from "@qwik.dev/core";
import { Button } from "./components/button";
import cssStyles from "./global.css?inline";

export default component$(() => {
  useStyles$(cssStyles);

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <h1 class="bg-accent-green">Hello World</h1>
        <Button>Click me</Button>
      </body>
    </>
  );
});
