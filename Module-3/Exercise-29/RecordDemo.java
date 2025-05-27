import java.util.*;
import java.util.stream.Collectors;

public class RecordDemo {
    record Person(String name, int age) {}

    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Ravi", 20),
            new Person("Sita", 17),
            new Person("Raj", 25)
        );

        List<Person> adults = people.stream()
                                    .filter(p -> p.age() >= 18)
                                    .collect(Collectors.toList());

        adults.forEach(System.out::println);
    }
}
