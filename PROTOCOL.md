# jmm protocol

Every compiler that is compatible with the jmm protocol, as outlined here, should
be able to run the jmm compiler website.

## Startup command

As a starting point, the compiler should be able to run the following command:

```bash
./compiler/jmm/bin/jmm -d -o -r=0 -i=${inputFile}
```

This command will compile the input file and output the result to the standard output.

- The `-d` flag will enable debug mode for the compiler.
- The `-o` flag will enable all optimizations.
- The `-r=0` flag will request register allocation is performed with the least amount of registers possible.
- The `-i=${inputFile}` flag will specify the input file to be compiled.

## Output format

The output of the compiler should consist of a series of sections.
Each section is composed of a header, a body and a footer.

The header is a single line that follows the format: `<section uuid="<UUID>" name="<NAME>">`.
- `<UUID>` is a unique identifier for the section (to prevent the content of the body to close the section).
- `<NAME>` is the name of the section that will appear in the website.

The body is a series of lines that contain the content of the section.
This content will be displayed in the website when the user selects the section.

The footer is a single line that follows the format: `<endsection uuid="<UUID>" status="<STATUS>">`.
- `<UUID>` is the unique identifier of the section. It must match the one in the header.
- `<STATUS>` is the status of the section, which can be either `good`, `bad` or `pending`. This status will influence the color of the status indicator of the section in the website.

## Java Adapter

There is a Java adapter available in `./protocol/JmmProtocolAdapter.java` that can be used to integrate the jmm protocol into your compiler.

This adapter will take care of creating the section headers and footers, as well as determining UUIDs and statuses for each section.

The adapter will rely on you outputing the result to the standard output yourself.
If any error is thrown inside the method that is passed to the adapter, the section will be marked as bad.

Here is how you can use the adapter:

```java
// Check if there are parsing errors
JmmProtocolAdapter.createSection("Parsing", () -> TestUtils.noErrors(parserResult.getReports()));

// ...

// Check if there are semantic analysis errors
JmmProtocolAdapter.createSection("Semantic Analysis", () -> TestUtils.noErrors(analyzerResult.getReports()));

// Create section for the symbol table and AST
JmmProtocolAdapter.createSection("Symbol Table", analyzerResult.getSymbolTable().print());
JmmProtocolAdapter.createSection("AST", analyzerResult.getRootNode().toTree());

// ...

// Check if there are AST Optimization errors
JmmProtocolAdapter.createSection("AST Optimizations", () -> TestUtils.noErrors(optimizedAstResult.getReports()));

// Create section for the optimized AST
JmmProtocolAdapter.createSection("Optimized AST", optimizedAstResult.getRootNode().toTree());

// ...

// Check if there are OLLIR Generation errors
JmmProtocolAdapter.createSection("OLLIR Generation", () -> TestUtils.noErrors(ollirResult.getReports()));

// Create section for the OLLIR code
JmmProtocolAdapter.createSection("OLLIR", ollirResult.getOllirCode());

// ...

// Check if there are OLLIR Optimization errors
JmmProtocolAdapter.createSection("OLLIR Optimizations", () -> TestUtils.noErrors(optimizedOllirResult.getReports()));

// Create section for the optimized OLLIR code
JmmProtocolAdapter.createSection("Optimized OLLIR", optimizedOllirResult.getOllirCode());

// ...

// Check if there are Jasmin Generation errors
JmmProtocolAdapter.createSection("Jasmin Generation", () -> TestUtils.noErrors(jasminResult.getReports()));

// Create section for the Jasmin code
JmmProtocolAdapter.createSection("Jasmin", jasminResult.getJasminCode());

```

## Example

Here is an example of the output of the compiler:

```xml
Executing with args: [-d, -o, -r=0, -i=/tmp/jmm-compile-XXXXXX25Qy71/input.jmm]
<section uuid="fe396d18-f00b-4386-b778-a1c08c27beff" name="Parsing">
<endsection uuid="fe396d18-f00b-4386-b778-a1c08c27beff" status="good">
<section uuid="b6a45176-da9d-4307-a2fe-83803d5a37ca" name="Semantic Analysis">
<endsection uuid="b6a45176-da9d-4307-a2fe-83803d5a37ca" status="good">
<section uuid="6841f6d5-f141-41c0-a9d5-1d3ed94dceb5" name="Symbol Table">
Class: HelloWorld
Super: Object

Imports: <no imports>

Fields: <no fields>

Methods: 0

<endsection uuid="6841f6d5-f141-41c0-a9d5-1d3ed94dceb5" status="good">
<section uuid="77a7461f-3d7f-440a-8b6e-1761ee25a37f" name="AST">
Program
   ClassDeclaration (name: HelloWorld)

<endsection uuid="77a7461f-3d7f-440a-8b6e-1761ee25a37f" status="good">
<section uuid="be154cf5-fc54-4c1f-bb20-4002ec09f6d0" name="AST Optimizations">
<endsection uuid="be154cf5-fc54-4c1f-bb20-4002ec09f6d0" status="good">
<section uuid="c8888655-8a25-4381-aea1-4b49459ecbfd" name="Optimized AST">
Program
   ClassDeclaration (name: HelloWorld)

<endsection uuid="c8888655-8a25-4381-aea1-4b49459ecbfd" status="good">
<section uuid="1c73a393-cee0-439e-99ae-b31dca69919b" name="OLLIR Generation">
<endsection uuid="1c73a393-cee0-439e-99ae-b31dca69919b" status="good">
<section uuid="0616cf5c-8a45-4438-a78a-0bdb9c3eb631" name="OLLIR">

HelloWorld {

    .construct HelloWorld().V {
        invokespecial(this, "<init>").V;
    }
}

<endsection uuid="0616cf5c-8a45-4438-a78a-0bdb9c3eb631" status="good">
<section uuid="e69be6fa-cf6d-4e15-9a02-56c8ae1a545d" name="OLLIR Optimizations">
<endsection uuid="e69be6fa-cf6d-4e15-9a02-56c8ae1a545d" status="good">
<section uuid="fc1247b1-293d-4513-ba83-5fe75a46b704" name="Optimized OLLIR">

HelloWorld {

    .construct HelloWorld().V {
        invokespecial(this, "<init>").V;
    }
}

<endsection uuid="fc1247b1-293d-4513-ba83-5fe75a46b704" status="good">
<section uuid="d28bb9e0-c7a4-4880-853c-1f305dbdca36" name="Jasmin Generation">
<endsection uuid="d28bb9e0-c7a4-4880-853c-1f305dbdca36" status="good">
<section uuid="018a4d6d-0180-429c-87b3-302c5a103f0d" name="Jasmin">
.class public HelloWorld
.super java/lang/Object

.method public <init>()V
        aload_0
        invokespecial java/lang/Object/<init>()V
        return
.end method


<endsection uuid="018a4d6d-0180-429c-87b3-302c5a103f0d" status="good">
<section uuid="d3fd49b8-8683-4f6c-a30e-6332f93f5692" name="Register Allocation">
Register allocation for method `HelloWorld`: 1 registers are needed
Variable this assigned to register #0

<endsection uuid="d3fd49b8-8683-4f6c-a30e-6332f93f5692" status="good">
```

This output will be displayed in the website as a series of sections that the user can expand to see the content of each section. The status of each section will be displayed as a colored indicator, which can be either green (good), red (bad) or pulsating yellow (pending).

### Notes

- All text that is not contained in a section, as specified above, will be ignored by the website.
- All sections which don't have content will not be displayed in the website.
- The content of every section is trimmed before being displayed in the website.
