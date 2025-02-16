package lk.ijse.DTO;

public class CustomerDTO {
    private String FirstName;
    private String LastName;
    private String Age;

    public CustomerDTO() {
    }

    public CustomerDTO(String firstName, String lastName, String age) {
        FirstName = firstName;
        LastName = lastName;
        Age = age;
    }

    public String getFirstName() {
        return FirstName;
    }

    public String getLastName() {
        return LastName;
    }

    public String getAge() {
        return Age;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public void setAge(String age) {
        Age = age;
    }

    @Override
    public String toString() {
        return "CustomerDTO{" +
                "FirstName='" + FirstName + '\'' +
                ", LastName='" + LastName + '\'' +
                ", Age='" + Age + '\'' +
                '}';
    }
}
