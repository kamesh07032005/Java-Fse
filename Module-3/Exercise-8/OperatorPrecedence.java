public class OperatorPrecedence {
    public static void main(String[] args) {
        int result = 10 + 5 * 2;  
        System.out.println("Result: " + result); 
        int result2 = (10 + 5) * 2; 
        System.out.println("With parentheses: " + result2); 
    }
}
