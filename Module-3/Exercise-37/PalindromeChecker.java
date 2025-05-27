import java.util.Scanner;

public class PalindromeChecker {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String input = sc.nextLine();

        String clean = input.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        String reverse = new StringBuilder(clean).reverse().toString();

        if (clean.equals(reverse)) {
            System.out.println("It's a palindrome.");
        } else {
            System.out.println("Not a palindrome.");
        }
    }
}
