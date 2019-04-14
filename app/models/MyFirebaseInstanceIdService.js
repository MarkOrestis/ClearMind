package clear.mind4261

import android.util.Log;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;



public class MyFirebaseInstanceIdService extends FirebaseInstanceIdService {


   //this method will be called
   //when the token is generated
   @Override
   public void onTokenRefresh() {
       super.onTokenRefresh();

       //now we will have the token
      String token = FirebaseInstanceId.getInstance().getToken();
      FirebaseUser firebaseUser = FirebaseAuth.getInstance().getCurrentUser();
        if (firebaseUser != null) {
            FirebaseDatabase.getInstance().getReference()
                    .child("users")
                    .child(firebaseUser.getUid())
                    .child("instanceId")
                    .setValue(token);
        }
       //for now we are displaying the token in the log
       //copy it as this method is called only when the new token is generated
       //and usually new token is only generated when the app is reinstalled or the data is cleared
       Log.d("FCM_TOKEN", token);
   }
}