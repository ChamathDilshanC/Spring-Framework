package lk.ijse.bean;

import org.springframework.stereotype.Component;

@Component("bean")
public class SpringBean {
    public SpringBean() {
        //System.out.println("Hello Spring Bean  constructor !!!");
    }

    public void helloSpring(){
        System.out.println("Hello Spring Bean Method !!!");
    }

}
