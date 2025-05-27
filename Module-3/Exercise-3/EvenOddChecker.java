import java.util.Scanner;

public class EvenOddChecker {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter an integer: ");
        int num = sc.nextInt();

        if (num % 2 == 0)
            System.out.println("Even number");
        else
            System.out.println("Odd number");
        sc.close();
    }
}
