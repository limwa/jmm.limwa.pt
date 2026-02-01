package pt.limwa.jmm.protocol;

import pt.limwa.jmm.protocol.config.ProtocolStageConfig;

public class Main {

    public static void main(String[] args) {
        var lexer = ProtocolStage.builder()
                .setName("Lexing")
                .setAction((protocol) -> {
                    var input = protocol.getInput();



                });

        var analyze = ProtocolStage.builder()
                .setName("Semantic Analysis")
                .setAction((protocol) -> {
                    var result = protocol.dependsOn()
                });
    }
}
