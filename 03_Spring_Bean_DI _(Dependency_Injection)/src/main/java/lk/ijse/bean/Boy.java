package lk.ijse.bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component("boy")
public class Boy {
    // Loose Coupling
    @Autowired
    @Qualifier("girl1")

    Agreement girl ;

    public Boy() {
        System.out.println("Boy Constructor Instantiated...");
    }
    // Tight Coupling
    public void chatWithGirl(){
        girl.chat();
    }

}
