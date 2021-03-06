/*
    Created on 25/08/17 by Ingen Dynamics Inc.
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.example.ajeet.rtor;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import static android.os.SystemClock.sleep;

/* Created on 25/11/17 by Ingen Dynamics Inc.
 * This class is used to perform a handshake between the robot and AI intern performing a
 * transaction by Token transfer for a particular data or information.
 */
public class MainActivity extends Activity {

    private DatabaseReference rootRef;
    private DatabaseReference demoRef;
    private Button btnSend;
    private Button mBalance;
    private TextView mT1;
    private TextView mT2;
    private TextView mT3;
    private TextView mT4;
    private TextView mT5;
    private ImageView mImgView;
    private String value;
    private Spinner mSpinnerData;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Create a Builder that detects nothing and has no violations.
        setContentView(R.layout.activity_main);
        if (android.os.Build.VERSION.SDK_INT > 9) {
            StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
            StrictMode.setThreadPolicy(policy);
        }

        btnSend = (Button) findViewById(R.id.btnAI);
        mBalance = (Button) findViewById(R.id.btnAIBalance);
        mSpinnerData = (Spinner) findViewById(R.id.spinnerMain);
        mImgView = (ImageView) findViewById(R.id.image);


        mT1 = (TextView) findViewById(R.id.tAI1);
        mT2 = (TextView) findViewById(R.id.tAI2);
        mT3 = (TextView) findViewById(R.id.tAI3);
        mT4 = (TextView) findViewById(R.id.tAI4);
        mT5 = (TextView) findViewById(R.id.tAI5);

        getDataAido1();
        getDataAido2();
        getDataIOT();
        getDataAI();
        getDataHuman();

        rootRef = FirebaseDatabase.getInstance().getReference();
        //database reference pointing to demo node
        demoRef = rootRef.child("rflags");


        btnSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                demoRef.child("rrflag").setValue("Robot1");

                Toast.makeText(MainActivity.this, "Token transfer under progress", Toast.LENGTH_LONG).show();

                Toast.makeText(MainActivity.this, "Please wait for the transaction to be completed", Toast.LENGTH_LONG).show();

            }
        });

        mBalance.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                getDataAido1();
                getDataAido2();
                getDataIOT();
                getDataAI();
                getDataHuman();

                Toast.makeText(MainActivity.this, "Refresh", Toast.LENGTH_SHORT).show();
                //After transaction has completed the image will show.
                mImgView.setImageResource(R.drawable.gray);

            }
        });


    }

    public void sle1() {
        sleep(30000);
    }

    public void getAIData() {


        demoRef.child("Aido2").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                value = dataSnapshot.child("data").getValue(String.class);
                ImageView mImgView = (ImageView) findViewById(R.id.image);

                ProgressDialog progressDialog = new ProgressDialog(MainActivity.this);
                progressDialog.setTitle("");
                progressDialog.setMessage("Refreshing...");
                progressDialog.show();

                mImgView.setImageResource(R.drawable.gray);

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            }
        });


    }

    //when the transaction has complete.It Retrive the Token amount from the running script and
    //show the balance.
    public void getDataAido1() {
        HttpURLConnection urlConnection = null;
        String result = "";
        try {
            URL url = new URL("http://ip_address/getTokenValueAido1.php?");
            urlConnection = (HttpURLConnection) url.openConnection();

            int code = urlConnection.getResponseCode();
            if (code == 200) {
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                if (in != null) {
                    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(in));
                    String line = "";

                    while ((line = bufferedReader.readLine()) != null)
                        result += line;
                }
                in.close();
            }

            mT1.setText(result);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //when the transaction has complete.It Retrive the Token amount from the running script and
    //show the balance.
    public void getDataAido2() {

        HttpURLConnection urlConnectionAido2 = null;
        String resultAido2 = "";
        try {
            URL url = new URL("http://ip_address/getTokenValueAido2.php?");
            urlConnectionAido2 = (HttpURLConnection) url.openConnection();

            int code = urlConnectionAido2.getResponseCode();
            if (code == 200) {
                InputStream in = new BufferedInputStream(urlConnectionAido2.getInputStream());
                if (in != null) {
                    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(in));
                    String line = "";

                    while ((line = bufferedReader.readLine()) != null)
                        resultAido2 += line;
                }
                in.close();
            }

            mT2.setText(resultAido2);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //when the transaction has complete.It Retrive the Token amount from the running script and
    //show the balance.
    public void getDataIOT() {

        HttpURLConnection urlConnectionIOT = null;
        String resultHuman = "";
        try {
            URL url = new URL("http://ip_address/getTokenValueIOT.php?");
            Log.i("data", url.toString());
            urlConnectionIOT = (HttpURLConnection) url.openConnection();

            int code = urlConnectionIOT.getResponseCode();
            if (code == 200) {
                InputStream in = new BufferedInputStream(urlConnectionIOT.getInputStream());
                if (in != null) {
                    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(in));
                    String line = "";

                    while ((line = bufferedReader.readLine()) != null)
                        resultHuman += line;
                }
                in.close();
            }

            mT3.setText(resultHuman);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //when the transaction has complete.It Retrive the Token amount from the running script and
    //show the balance.
    public void getDataAI() {

        HttpURLConnection urlConnectionAI = null;
        String resultAI = "";
        try {
            URL url = new URL("http://ip_address/getTokenValueAI.php?");
            Log.i("data", url.toString());
            urlConnectionAI = (HttpURLConnection) url.openConnection();

            int code = urlConnectionAI.getResponseCode();
            if (code == 200) {
                InputStream in = new BufferedInputStream(urlConnectionAI.getInputStream());
                if (in != null) {
                    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(in));
                    String line = "";

                    while ((line = bufferedReader.readLine()) != null)
                        resultAI += line;
                }
                in.close();
            }

            mT4.setText(resultAI);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //when the transaction has complete.It Retrive the Token amount from the running script and
    //show the balance.
    public void getDataHuman() {

        HttpURLConnection urlConnectionHuman = null;
        String resultIOT = "";
        try {
            URL url = new URL("http://ip_address/getTokenValueHuman.php?");
            Log.i("data", url.toString());
            urlConnectionHuman = (HttpURLConnection) url.openConnection();

            int code = urlConnectionHuman.getResponseCode();
            if (code == 200) {
                InputStream in = new BufferedInputStream(urlConnectionHuman.getInputStream());
                if (in != null) {
                    BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(in));
                    String line = "";

                    while ((line = bufferedReader.readLine()) != null)
                        resultIOT += line;
                }
                in.close();
            }

            mT5.setText(resultIOT);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

}

