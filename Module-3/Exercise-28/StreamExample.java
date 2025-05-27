import java.util.*;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 21, 30, 41, 50);

        List<Integer> even = numbers.stream()
                                    .filter(n -> n % 2 == 0)
                                    .collect(Collectors.toList());

        System.out.println("Even Numbers: " + even);
    }
}
