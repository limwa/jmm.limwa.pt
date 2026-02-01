package pt.limwa.jmm.protocol.function;

public interface ThrowingFunction<T, U, E extends Throwable> {
    U apply(T t) throws E;
}
