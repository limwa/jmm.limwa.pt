package pt.limwa.jmm.protocol.function;

public interface ThrowingRunnable<E extends Throwable> {
    void run() throws E;
}
