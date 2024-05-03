package pt.up.fe.comp2023;

import java.util.UUID;

public class JmmProtocolAdapter {

    public interface ThrowingRunnable<T extends Throwable> {
        void run() throws T;
    }

    public static <T extends Throwable> void createSection(String name, ThrowingRunnable<T> action) throws T {
        var uuid = UUID.randomUUID();
        System.out.printf("<section uuid=\"%s\" name=\"%s\">%n", uuid, name);

        try {
            action.run();
            System.out.printf("<endsection uuid=\"%s\" status=\"good\">%n", uuid);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            System.out.printf("<endsection uuid=\"%s\" status=\"bad\">%n", uuid);
            throw e;
        }
    }

    public static void createSection(String name, String content) {
        createSection(name, () -> System.out.println(content));
    }
}
