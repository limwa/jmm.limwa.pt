import type { ProtocolSection } from "@/app/actions";
import { useCompilerContext } from "@/lib/hooks/compiler";

export function CompilerOutput() {
    const { outputSections } = useCompilerContext();


}

export function CompilerOutputSection({ section }: { section: ProtocolSection }) {
    
    

}