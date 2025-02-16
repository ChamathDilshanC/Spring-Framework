package lk.ijse.di;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component()
public class Boy implements DI {
    // Loose Coupling
    Agreement girl;

    @Autowired
    public Boy(Agreement girl) {
        System.out.println("Boy Constructor Instantiated...");
        this.girl = girl;
    }
    // Tight Coupling
    public void chatWithGirl(){
        girl.chat();
    }

    @Override
    public void inject() {
        chatWithGirl();
    }
}
