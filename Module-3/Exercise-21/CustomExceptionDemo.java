class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class CustomExceptionDemo {
    public static void main(String[] args) {
        int age = 16;

        try {
            if (age < 18) {
                throw new InvalidAgeException("Age must be 18 or above.");
            }
            System.out.println("Age is valid.");
        } catch (InvalidAgeException e) {
            System.out.println("Caught Exception: " + e.getMessage());
        }
    }
}
