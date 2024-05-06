# jmm protocol

Every compiler that is compatible with the jmm protocol, as outlined here, should
be able to run in the jmm compiler website.

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

The output of a compiler should contain a single `<output>` and a single `<endoutput>` tag.

Within those tags, the contents of the output should consist of a series of sections.
Each section is composed of a header, a body and a footer.

The header is a single line that follows the format: `<section uuid="<UUID>" name="<NAME>">`.

- `<UUID>` is a unique identifier for the section (to prevent the content of the body to close the section).
- `<NAME>` is the name of the section that will appear in the website.

The body is a series of lines that contain the content of the section.
This content will be displayed in the website when the user selects the section.

The footer is a single line that follows the format: `<endsection uuid="<UUID>" status="<STATUS>">`.

- `<UUID>` is the unique identifier of the section. It must match the one in the header.
- `<STATUS>` is the status of the section, which can be either `good`, `bad` or `pending`. This status will influence the color of the status indicator of the section in the website.

### Java Adapter

There is a Java adapter available in [protocol/JmmProtocolAdapter.java](./protocol/JmmProtocolAdapter.java) that can be used to integrate the jmm protocol into your compiler.

This adapter will take care of creating the section headers and footers, as well as determining UUIDs and statuses for each section.

The adapter will rely on you outputing the result to the standard output (or standard error) yourself.
If any error is thrown inside the lambda that is passed to the adapter, the section will be marked as bad.

Here is how you can use the adapter:

```java
JmmProtocolAdapter.start(adapter -> {
    // ...

    // Check if there are parsing errors
    adapter.createSection("Parsing", () -> TestUtils.noErrors(parserResult.getReports()));

    // ...

    // Check if there are semantic analysis errors
    adapter.createSection("Semantic Analysis", () -> TestUtils.noErrors(analyzerResult.getReports()));

    // Create section for the symbol table and AST
    adapter.createSection("Symbol Table", analyzerResult.getSymbolTable().print());
    adapter.createSection("AST", analyzerResult.getRootNode().toTree());

    // ...

    // Check if there are AST Optimization errors
    adapter.createSection("AST Optimizations", () -> TestUtils.noErrors(optimizedAstResult.getReports()));

    // Create section for the optimized AST
    adapter.createSection("Optimized AST", optimizedAstResult.getRootNode().toTree());

    // ...

    // Check if there are OLLIR Generation errors
    adapter.createSection("OLLIR Generation", () -> TestUtils.noErrors(ollirResult.getReports()));

    // Create section for the OLLIR code
    adapter.createSection("OLLIR", ollirResult.getOllirCode());

    // ...

    // Check if there are OLLIR Optimization errors
    adapter.createSection("OLLIR Optimizations", () -> TestUtils.noErrors(optimizedOllirResult.getReports()));

    // Create section for the optimized OLLIR code
    adapter.createSection("Optimized OLLIR", optimizedOllirResult.getOllirCode());

    // ...

    // Check if there are Jasmin Generation errors
    adapter.createSection("Jasmin Generation", () -> TestUtils.noErrors(jasminResult.getReports()));

    // Create section for the Jasmin code
    adapter.createSection("Jasmin", jasminResult.getJasminCode());
});
```

## Compiler Output Example

Here is an example of the output of the compiler:

```xml
<output>
Executing with args: [-d, -o, -r=0, -i=/tmp/jmm-compile-XXXXXX25Qy71/input.jmm]
<section uuid="c9e076f6-7a89-4f11-b0b8-1f39486414d4" name="Parsing">
<endsection uuid="c9e076f6-7a89-4f11-b0b8-1f39486414d4" status="good">
<section uuid="a951f633-828a-46fa-872a-5de18fe0f538" name="Semantic Analysis">
<endsection uuid="a951f633-828a-46fa-872a-5de18fe0f538" status="good">
<section uuid="0f683489-32bb-4592-a8c9-ce2b79eea997" name="Symbol Table">
Class: HelloWorld
Super: Object

Imports: <no imports>

Fields: <no fields>

Methods: 0

<endsection uuid="0f683489-32bb-4592-a8c9-ce2b79eea997" status="good">
<section uuid="e3f90e4a-88a6-4a98-9081-64b5d8aa0818" name="AST">
Program
   ClassDeclaration (name: HelloWorld)

<endsection uuid="e3f90e4a-88a6-4a98-9081-64b5d8aa0818" status="good">
<section uuid="84945204-df56-454c-a608-0ccbdcae0ed3" name="AST Optimizations">
<endsection uuid="84945204-df56-454c-a608-0ccbdcae0ed3" status="good">
<section uuid="6d2d2e6a-9c71-4591-8e3d-c76c73558ee7" name="Optimized AST">
Program
   ClassDeclaration (name: HelloWorld)

<endsection uuid="6d2d2e6a-9c71-4591-8e3d-c76c73558ee7" status="good">
<section uuid="6f69e873-2905-4180-acfe-a1fe3817a264" name="OLLIR Generation">
<endsection uuid="6f69e873-2905-4180-acfe-a1fe3817a264" status="good">
<section uuid="323cdd7e-3310-496c-8de7-5f5124828280" name="OLLIR">

HelloWorld {

    .construct HelloWorld().V {
        invokespecial(this, "<init>").V;
    }
}

<endsection uuid="323cdd7e-3310-496c-8de7-5f5124828280" status="good">
<section uuid="623dd908-84b8-443c-8863-df95ef4ba208" name="OLLIR Optimizations">
<endsection uuid="623dd908-84b8-443c-8863-df95ef4ba208" status="good">
<section uuid="3f102216-1732-4a9e-9f04-b7e12ade5692" name="Optimized OLLIR">

HelloWorld {

    .construct HelloWorld().V {
        invokespecial(this, "<init>").V;
    }
}

<endsection uuid="3f102216-1732-4a9e-9f04-b7e12ade5692" status="good">
<section uuid="94912fc0-6f11-4353-bb8c-594c64fc7bf4" name="Jasmin Generation">
<endsection uuid="94912fc0-6f11-4353-bb8c-594c64fc7bf4" status="good">
<section uuid="6b17151e-866f-47c4-b3b7-c1592ccc6bcf" name="Jasmin">
.class public HelloWorld
.super java/lang/Object

.method public <init>()V
        aload_0
        invokespecial java/lang/Object/<init>()V
        return
.end method


<endsection uuid="6b17151e-866f-47c4-b3b7-c1592ccc6bcf" status="good">
<section uuid="f54ccbbf-1757-4351-adef-13117968f826" name="Register Allocation">
Register allocation for method `HelloWorld`: 1 registers are needed
Variable this assigned to register #0

<endsection uuid="f54ccbbf-1757-4351-adef-13117968f826" status="good">
<endoutput>
```

This output will be displayed in the website as a series of sections that the user can expand to see the content of each section. The status of each section will be displayed as a colored indicator, which can be either green (good), red (bad) or pulsating yellow (pending).

### Notes

- All text that is not contained in a section, as specified above, will be ignored by the website, even if it is between `<output>` and `<endoutput>` tags.
- All sections which don't have content will not be displayed in the website.
- The content of every section is trimmed before being displayed in the website.
- If the `<output>` and `<endoutput>` tags are not present, the website will display an "Internal Error" message and the content of the standard error will be printed in the server.
