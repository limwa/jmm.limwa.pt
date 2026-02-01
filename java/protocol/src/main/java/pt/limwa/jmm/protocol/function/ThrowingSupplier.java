package pt.limwa.jmm.protocol.function;

public interface ThrowingSupplier<T, E extends Throwable> {
    T get() throws E;
}
