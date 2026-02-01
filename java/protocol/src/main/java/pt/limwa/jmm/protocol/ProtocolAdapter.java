package pt.limwa.jmm.protocol;

import pt.limwa.jmm.protocol.function.ThrowingConsumer;
import pt.limwa.jmm.protocol.function.ThrowingFunction;
import pt.limwa.jmm.protocol.function.ThrowingRunnable;
import pt.limwa.jmm.protocol.function.ThrowingSupplier;

import java.util.UUID;

public class ProtocolAdapter {

    private ProtocolAdapter() {}

    private boolean inSection = false;

    public static <E extends Throwable> void start(ThrowingConsumer<ProtocolAdapter, E> action) throws E {
        start(adapter -> {
            action.accept(adapter);
            return null;
        });
    }

    public static <U, E extends Throwable> U start(ThrowingFunction<ProtocolAdapter, U, E> action) throws E {
        var adapter = new ProtocolAdapter();

        System.out.println("<output>");
        try {
            var result = action.apply(adapter);
            System.out.println("<endoutput>");
            return result;

        } catch (Throwable throwable) {
            if (adapter.inSection) {
                System.out.println("<endoutput>");
            }

            throw throwable;
        }
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
            inSection = true;
            var result = action.get();
            inSection = false;

            System.out.printf("<endsection uuid=\"%s\" status=\"good\">%n", uuid);
            return result;
        } catch (Throwable throwable) {
            System.out.println(throwable.getMessage());
            System.out.printf("<endsection uuid=\"%s\" status=\"bad\">%n", uuid);
            throw throwable;
        }
    }

    public void createSection(String name, String content) {
        createSection(name, () -> System.out.println(content));
    }
}

