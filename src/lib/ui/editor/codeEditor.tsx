import { useCompilerContext } from "@/lib/hooks/compiler"
import { Editor } from "@monaco-editor/react"


export type CodeEditorProps = {
    initialCode: string
}

export default function CodeEditor({initialCode}: CodeEditorProps){
    const compilerContext =  useCompilerContext()
    
    return (
        <>
            <Editor 
              language="java" 
              defaultValue={initialCode}
              theme={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'vs-dark' : 'light'}
              onChange={ (value) => {
                if (value != undefined) compilerContext.setCode(value)
              }}
              />
        </>
    )
}