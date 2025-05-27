import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double num1 = 0, num2 = 0;

        System.out.print("Enter first number: ");
        while (!sc.hasNextDouble()) {
            System.out.println("Invalid input! Please enter a number.");
            sc.next(); // Clear the invalid input
            System.out.print("Enter first number: ");
        }
        num1 = sc.nextDouble();

        System.out.print("Enter second number: ");
        while (!sc.hasNextDouble()) {
            System.out.println("Invalid input! Please enter a number.");
            sc.next(); // Clear the invalid input
            System.out.print("Enter second number: ");
        }
        num2 = sc.nextDouble();

        System.out.println("Choose operation (+, -, *, /): ");
        char op = sc.next().charAt(0);

        double result = 0;
        switch (op) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/':
                if (num2 != 0) result = num1 / num2;
                else {
                    System.out.println("Cannot divide by zero.");
                    return;
                }
                break;
            default:
                System.out.println("Invalid operator!");
                return;
                
        }

        System.out.println("Result: " + result);
        sc.close();
    }
}
