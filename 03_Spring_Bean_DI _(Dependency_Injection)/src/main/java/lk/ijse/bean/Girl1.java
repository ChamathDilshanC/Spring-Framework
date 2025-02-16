package lk.ijse.bean;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
public class Girl1 implements Agreement{

    public Girl1() {
        System.out.println("Girl-1 Constructor Instantiated...");
    }

    @Override
    public void chat() {
        System.out.println("Girl-1 is chatting...");
    }
}
