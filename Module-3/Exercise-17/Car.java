public class Car {
    String make;
    String model;
    int year;

    void displayDetails() {
        System.out.println(year + " " + make + " " + model);
    }

    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.make = "Toyota";
        myCar.model = "Camry";
        myCar.year = 2020;

        myCar.displayDetails();
    }
}
