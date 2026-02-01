package pt.limwa.jmm.protocol.config;

public class ProtocolEntrypointConfig {
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Builder() {}

        public Builder addInput(ProtocolInputConfig input) {
            return this;
        }

    }

    private ProtocolEntrypointConfig() {}
}
