# altdeutsches-woerterbuch

## Developing

Once you've created a project and installed dependencies with `pnpm`, start a development server:

```fish
pnpm db:push

# or start the server and open the app in a new browser tab
pnpm dev
```

## Building

To create a production version of the app:

```fish
pnpm db:push
pnpm build
```

You can preview the production build with `pnpm preview`.

To run the app on Node.JS run `node build`.
