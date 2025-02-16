package lk.ijse;

import lk.ijse.bean.*;
import lk.ijse.config.AppConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AppInitializer {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.register(AppConfig.class);
        context.refresh();

        /*SpringBean springBean = new SpringBean();
        springBean.helloSpring();*/

        // SpringBean By Class
/*        SpringBean springBean = context.getBean(SpringBean.class);
        springBean.helloSpring();
        System.out.println("Spring Bean  | " + springBean);

        // SpringBean springBeanID
        SpringBean springBeanID = (SpringBean) context.getBean("bean");
        springBean.helloSpring();
        System.out.println("Spring Bean  | " + springBeanID);

        // TestBean By Class
        T/

        /*Runtime.getRuntime().addShutdownHook(new Thread() {
           public void run(){
               System.out.println("Shutting Down...");
               context.close();
           }
        });*/
/*        Object testBean1 = context.getBean("testBean1");
        System.out.println("Bean1 Object | " + testBean1);

        Object testBean2 = context.getBean("testBean2");
        System.out.println("Bean2 Object | " + testBean2);

        Object testBean3 = context.getBean("testBean3");
        System.out.println("Bean3 Object | " + testBean3);*/


        TestBean1 tb1 = (TestBean1) context.getBean("testBean1");
        System.out.println("Bean1 Object By ID | " + tb1);

        TestBean2 tb2 = (TestBean2) context.getBean("testBean2");
        System.out.println("Bean2 Object By ID | " + tb2);

        TestBean3 tb3 = (TestBean3) context.getBean("testBean3");
        System.out.println("Bean3 Object By ID | " + tb3);

        TestBean3 ref1 = (TestBean3) context.getBean("testBean3");
        System.out.println("Bean3 Object By ID | " + ref1);

        TestBean3 ref2 = (TestBean3) context.getBean("testBean3");
        System.out.println("Bean3 Object By ID | " + ref2);

        context.registerShutdownHook();

        MyConnection myConnection = (MyConnection) context.getBean("myConnection");
        System.out.println("MyConnection | " + myConnection);

        MyConnection myConnectionRef = (MyConnection) context.getBean("myConnection");
        System.out.println("MyConnection | " + myConnectionRef);
        MyConnection myConnectionRef1 = (MyConnection) context.getBean("myConnection");
        System.out.println("MyConnection | " + myConnectionRef1);

    }
}
