# jmm.limwa.pt

This is the repository for the website of the [jmm compiler](https://jmm.limwa.pt) website.

jmm is a subset of the Java programming language, used in the Compilers course
at (FEUP)[https://fe.up.pt].

This tool was made to help students understand the steps taken by the compiler to transform
the source code into the final executable.

## How to run

To run the website, you need to have [Node.js](https://nodejs.org/en/) installed.

You will also need a compiler that is compatible with the [jmm protocol](./PROTOCOL.md)
The executable for the compiler should be placed in `./compiler/jmm/bin/jmm`.

After having both prerequisites taken care of, you can run the following commands:

```bash
pnpm install
pnpm dev
```

This will start a development server on `localhost:3000`.

## How to deploy

To deploy the website, the recommended method is to use [Docker](https://www.docker.com/).

There are two Dockerfiles available that you can use.

1. `Dockerfile` - Uses the `JMM_URL` build argument to download a zip file with all of the files needed to run the compiler.

    ```bash
    docker build --build-arg JMM_URL=https://example.com/compiler.zip -t jmm-compiler .
    docker run -itp 3000:3000 jmm-compiler
    ```

2. `Dockerfile.copy` - Copies the files in the `./compiler` directory to the image.

    ```bash
    docker build -f Dockerfile.copy -t jmm-compiler .
    docker run -itp 3000:3000 jmm-compiler
    ```
