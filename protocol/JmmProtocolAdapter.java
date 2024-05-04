package pt.limwa.jmm.protocol;

import java.util.UUID;

public class JmmProtocolAdapter {

    private JmmProtocolAdapter() {}

    public interface ThrowingRunnable<E extends Throwable> {
        void run() throws E;
    }

    public interface ThrowingSupplier<T, E extends Throwable> {
        T get() throws E;
    }

    public interface ThrowingConsumer<T, E extends Throwable> {
        void accept(T t) throws E;
    }

    public interface ThrowingFunction<T, U, E extends Throwable> {
        U apply(T t) throws E;
    }

    public static <E extends Throwable> void start(ThrowingConsumer<JmmProtocolAdapter, E> action) throws E {
        start(adapter -> {
            action.accept(adapter);
            return null;
        });
    }

    public static <U, E extends Throwable> U start(ThrowingFunction<JmmProtocolAdapter, U, E> action) throws E {
        var adapter = new JmmProtocolAdapter();

        System.out.println("<output>");
        var result = action.apply(adapter);
        System.out.println("<endoutput>");

        return result;
    }

    public <E extends Throwable> void createSection(String name, ThrowingRunnable<E> action) throws E {
        createSection(name, () -> {
            action.run();
            return null;
        });
    }

    public <T, E extends Throwable> T createSection(String name, ThrowingSupplier<T, E> action) throws E {
        var uuid = UUID.randomUUID();
        System.out.printf("<section uuid=\"%s\" name=\"%s\">%n", uuid, name);

        try {
            var result = action.get();
            System.out.printf("<endsection uuid=\"%s\" status=\"good\">%n", uuid);

            return result;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.printf("<endsection uuid=\"%s\" status=\"bad\">%n", uuid);
            throw e;
        }
    }

    public void createSection(String name, String content) {
        createSection(name, () -> System.out.println(content));
    }
}
