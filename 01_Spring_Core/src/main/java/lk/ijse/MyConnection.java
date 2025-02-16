package lk.ijse;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class MyConnection {
    public MyConnection() {
        System.out.println("MyConnection Constructor !!!");
    }
}
