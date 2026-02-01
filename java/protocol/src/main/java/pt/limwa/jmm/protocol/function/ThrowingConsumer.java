package pt.limwa.jmm.protocol.function;

public interface ThrowingConsumer<T, E extends Throwable> {
    void accept(T t) throws E;
}