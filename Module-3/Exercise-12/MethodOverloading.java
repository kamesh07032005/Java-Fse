public class MethodOverloading {
    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }

    static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        System.out.println("Add two ints: " + add(5, 10));
        System.out.println("Add two doubles: " + add(5.5, 4.5));
        System.out.println("Add three ints: " + add(1, 2, 3));
    }
}
