import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Random rand = new Random();
        Scanner sc = new Scanner(System.in);

        int numberToGuess = rand.nextInt(100) + 1;
        int guess;

        System.out.println("Guess the number between 1 and 100:");

        do {
            System.out.print("Enter your guess: ");
            guess = sc.nextInt();

            if (guess < numberToGuess)
                System.out.println("Too low!");
            else if (guess > numberToGuess)
                System.out.println("Too high!");
            else
                System.out.println("Correct! The number was " + numberToGuess);
        } while (guess != numberToGuess);
    }
}
