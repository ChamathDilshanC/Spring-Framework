package lk.ijse.di;

import org.springframework.stereotype.Component;

@Component
public class Girl implements Agreement {

    public Girl() {
        System.out.println("Girl-1 Constructor Instantiated...");
    }

    @Override
    public void chat() {
        System.out.println("Girl-1 is chatting...");
    }
}
