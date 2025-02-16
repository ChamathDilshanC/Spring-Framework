package lk.ijse.bean;

import org.springframework.stereotype.Component;

//@Component
public class SpringBean {
    public SpringBean() {
        System.out.println("Spring Bean Instantiated...");
    }

    public void print(){
        System.out.println("Hello Spring Bean...");
    }
}
