import java.util.HashMap;
import java.util.Scanner;

public class StudentDirectory {
    public static void main(String[] args) {
        HashMap<Integer, String> students = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        
        while (true) {
            System.out.println("\n1. Add student");
            System.out.println("2. Find student");
            System.out.println("3. Exit");
            System.out.print("Choose an option: ");
            
            int choice = scanner.nextInt();
            
            switch (choice) {
                case 1:
                    System.out.print("Enter student ID: ");
                    int id = scanner.nextInt();
                    scanner.nextLine(); // Clear buffer
                    System.out.print("Enter student name: ");
                    String name = scanner.nextLine();
                    students.put(id, name);
                    System.out.println("Student added successfully!");
                    break;
                    
                case 2:
                    System.out.print("Enter student ID to search: ");
                    int searchId = scanner.nextInt();
                    String studentName = students.get(searchId);
                    if (studentName != null) {
                        System.out.println("Student name: " + studentName);
                    } else {
                        System.out.println("Student not found!");
                    }
                    break;
                    
                case 3:
                    System.out.println("Goodbye!");
                    scanner.close();
                    return;
                    
                default:
                    System.out.println("Invalid option!");
            }
        }
    }
}