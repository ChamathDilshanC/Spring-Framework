package lk.ijse.bean;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class TestBean3 {
    public  TestBean3(){
        System.out.println("TestBean3 Constructor !!!");
    }
}
