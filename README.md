# jmm.limwa.pt

This is the repository for the website of the [jmm compiler](https://jmm.limwa.pt) website.

jmm is a subset of the Java programming language, used in the Compilers course
at [FEUP](https://sigarra.up.pt/feup/pt/web_page.inicial).

This tool was made to help students understand the steps taken by the compiler to transform
the source code into the final executable.

## How to run

To run the website, you need to have [Node.js](https://nodejs.org/en/) installed.

You will also need a compiler that is compatible with the [jmm protocol](./PROTOCOL.md).
The executable for the compiler should be placed in `./compiler/jmm/bin/jmm`.

After having both prerequisites taken care of, you can run the following commands:

```bash
pnpm install
pnpm dev
```

This will start a development server on `localhost:3000`.

## Environment variables

The following environment variables can be used to configure the website at runtime:

- `APP_TITLE` - The title of the website. Defaults to "jmm compiler".
- `APP_DESCRIPTION` - The description of the website. Defaults to "An application to compile Java-- code".
- `ADMIN_CONTACT_INFO` - The contact information for the administrator. Used for when there is an internal server error in the compilation process.
- `ANALYTICS_PROVIDER` - The analytics provider you are using. Only "cloudflare" is supported at this time.
  - `CLOUDFLARE_ANALYTICS_TOKEN` - The token for the Cloudflare analytics provider.
- `JMM_EXTRA_ARGS` - Extra arguments passed to the compiler during compilation. Arguments must be separated using `:/:`.
  - Example: `-d:/:--pretty`.

## How to deploy

To deploy the website, the recommended method is to use [Docker](https://www.docker.com/).

There is a Dockerfile available that you can use, with several different ways to include your compiler.

- `copy` - The default strategy, copies the files in the `./compiler` directory to the image.

  ```bash
  docker build -t jmm-compiler .
  docker run -itp 3000:3000 jmm-compiler
  ```

- `download` - Uses the `JMM_URL` build argument to download a zip file with all of the files to be placed in the `./compiler` directory.

  ```bash
  docker build --build-arg JMM_STRATEGY=download --build-arg JMM_URL=https://example.com/compiler.zip -t jmm-compiler .
  docker run -itp 3000:3000 jmm-compiler
  ```

- `git` - Uses the `JMM_URL` build argument to clone a git repository.
  The optional `JMM_BRANCH` build argument can be used to specify the branch to clone.
  This strategy then uses gradle to build the compiler using the `installDist` task.

  ```bash
  docker build --build-arg JMM_STRATEGY=git --build-arg JMM_URL=https://example.com/compiler.git -t jmm-compiler .
  docker run -itp 3000:3000 jmm-compiler
  ```
