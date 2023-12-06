package io.ionic.starter;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.mycompany.plugins.example.ExamplePlugin;
public class MainActivity extends BridgeActivity {
 @Override
 public void onCreate(Bundle savedInstanceState)
 {
    registerPlugin(ExamplePlugin.class);
    super.onCreate(savedInstanceState);
 }
}
