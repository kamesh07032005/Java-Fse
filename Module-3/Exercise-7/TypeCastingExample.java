public class TypeCastingExample {
    public static void main(String[] args) {
        double d = 9.78;
        int i = (int) d;

        int x = 10;
        double y = x;

        System.out.println("Double to int: " + i);
        System.out.println("Int to double: " + y);
    }
}
