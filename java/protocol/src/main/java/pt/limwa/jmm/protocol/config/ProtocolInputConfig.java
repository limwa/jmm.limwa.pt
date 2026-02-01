package pt.limwa.jmm.protocol.config;

public class ProtocolInputConfig {

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private Builder() {}

        public ProtocolInputConfig build(String name) {
            return new ProtocolInputConfig(name);
        }
    }

    private final String name;

    private ProtocolInputConfig(String name) {
        this.name = name;
    }
}
