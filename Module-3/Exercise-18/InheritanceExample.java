class Animal {
    void makeSound() {
        System.out.println("Some sound...");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Bark");
    }
}

public class InheritanceExample {
    public static void main(String[] args) {
        Animal a = new Animal();
        Dog d = new Dog();

        a.makeSound();  
        d.makeSound();  
    }
}
