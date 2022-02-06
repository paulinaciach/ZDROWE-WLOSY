# ZDROWE-WLOSY
#### Zdrowe Włosy jest to baza danych zawierająca składy kosmetyków do pielęgnacji włosów. 

## Spis treści 
* [Wprowadzenie](#wprowadzenie)
* [Linki](#linki)
* [Uruchomienie](#uruchomienie)
* [Architektura systemu i oprogramowania](#architektura-systemu-i-oprogramowania)
* [Przykład kodu dla funkcjonalności](#przykład-kodu-dla-funkcjonalności)
* [Ilustracje](#ilustracje)


## Linki 

<b>server:</b> https://zdrowewlosy.herokuapp.com/ 
<br/>
<b>front:</b> https://zdrowe-wlosy.netlify.app/

## Wprowadzenie 
 
Zdrowe włosy jest to serwis internetowy z baza danych zawierająca składy kosmetyków do pielęgnacji włosów.<br/>
Jako niezalogowany użytkownik możesz przeszukiwać bazę danych, natomiast jako zalogowany użytkownik 
możesz dodawać nowe kosmetyki i usuwać swoje wspiy, a także zostawiać 'like' pod ulubionymi i polecanymi produktami. Oczywiście edycja wpisów jest możliwa! <br/><br/>
Użytkownik może się logować za pomoca konta Google, lub podajac swoja nazwe uzykownika i hasło.<br/>


## Uruchomienie

<b>-npm install</b>

## Architektura systemu i oprogramowania 

**Stack technologiczny:**
* MongoDB - document database
* Express(.js) - Node.js web framework
* React(.js) - a client-side JavaScript framework
* Node(.js) - the premier JavaScript web server
* CSS Framework: MUI -> @material-ui/core

**API zewnetrzne:**
* Google API -> Google OAuth 2.0 

**Architektura uruchomieniowa:**
* Visual Code

**Zainstalowane narzedzia:**

<b>server:</b>
* body-parser 
* cors 
* express 
* mongoose 
* nodemon
* react-redux
* bcryptjs jsonwebtoken

<b>*client:*</b>
* axios moment 
* react-file-base64
* redux 
* redux-thunk
* jwt-decode react-google-login
* react-router-dom

**Serwery:**
* Heroku
* Netlify

## Przykład kodu dla funkcjonalności 

### **Kamery na żywo**
* **lista lokalizacji z kamerami na żywo podzielona w sekcje np. Trójmiasto zawiera kamery z Gdyni, Spotu, Gdańska**
 ```java   
 final ArrayList<Item> cameraList = new ArrayList<Item>();
        // Header ex. Gdansk
        cameraList.add(new SectionItem("Trójmiasto"));
        // Camera Name
        cameraList.add(new EntryItem("Molo Brzeźno"));
        cameraList.add(new EntryItem("Molo Sopot"));
        cameraList.add(new EntryItem("Gdynia"));
```
* **po wybraniu lokalizacji jest właczany stream z kamery poprzez WebView -> na portalu właściciela**
```java
Intent intent = new Intent(LiveStreamActivity.this, StreamActivity.class);
                        locationName = cameraList.get(position).getTitle();

                        switch(cameraList.get(position).getTitle()) {
                            case "Molo Brzeźno":
                                sharedValue ="<iframe src=\"https://static.webcamera.pl/player/gdansk_cam_77aeaf-webcamera.html?preroll-wait=true&amp;&amp;block-autoplay=true\" \n" +
                                        "mozallowfullscreen=\"\" webkitallowfullscreen=\"\" allowfullscreen=\"\" scrollbars=\"no\" scrolling=\"no\"></iframe>";
                                break;
                            case "Molo Sopot":
                                sharedValue ="<iframe src=\"https://imageserver.webcamera.pl/umiesc/sopot-molo\" " +
                                            "width=\"800\" height=\"450\" border=\"0\" frameborder=\"0\" scrolling=\"no\"></iframe>";
                                break;
```
```java
String v_url = LiveStreamActivity.sharedValue;
setContentView(R.layout.activity_streams);
        myWebView = (WebView) findViewById(R.id.webView);
        myWebView.getSettings().setDomStorageEnabled(true);

        if(v_url.contains("iframe")){
            Matcher matcher = Pattern.compile("src=\"([^\"]+)\"").matcher(v_url);
            matcher.find();
            String src = matcher.group(1);
            v_url=src;
            
            try {
                URL myURL = new URL(src);
                myWebView.loadUrl(src);

            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }else {

            myWebView.loadDataWithBaseURL(null, "<style>img{display: inline;height: auto;max-width: 100%;}</style>"
                    + myWebView, "text/html", "UTF-8", null);}
```

* **filtrowanie i wyszukiwanie lokalizacji po nazwie** 
```java
        protected FilterResults performFiltering(CharSequence constraint) {
        
                    FilterResults results = new FilterResults();
                    ArrayList<Item> filteredArrayList = new ArrayList<Item>();

                    if(originalItem == null || originalItem.size() == 0)
                    {
                        originalItem = new ArrayList<Item>(item);
                    }
                   
                    if(constraint == null && constraint.length() == 0)
                    {
                        results.count = originalItem.size();
                        results.values = originalItem;
                    }
                    else
                    {
                        constraint = constraint.toString().toLowerCase(Locale.ENGLISH);
                        for (int i = 0; i < originalItem.size(); i++)
                        {
                            String title = originalItem.get(i).getTitle().toLowerCase(Locale.ENGLISH);
                            if(title.contains(constraint.toString()))
                            {
                                filteredArrayList.add(originalItem.get(i));
                            }
                        }
                        results.count = filteredArrayList.size();
                        results.values = filteredArrayList;
                    }
                    return results;
                }
            };

```



### **Pogoda dla wybranej lokalizacji**

* **wyświetlenie pogody dla wprowadzonego miasta** 
```java
    public void getWeather(View view) {
        String tempURL = "";
        String city = cityET.getText().toString().trim();
        if(city.equals("")) {
            resultTV.setText("Pole nie może być puste");
        } else {
            tempURL = url + "?q=" + city + "&lang=pl&units=metric&appid=" + apiKey;

            StringRequest stringRequest = new StringRequest(Request.Method.POST, tempURL, new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {
                    //Log.d("response", response);
                    String output ="";
                    try {
                        JSONObject jsonResponse = new JSONObject(response);
                        JSONArray jsonArray = jsonResponse.getJSONArray("weather");
                        JSONObject jsonObjectWeather = jsonArray.getJSONObject(0);
                        String weather = jsonObjectWeather.getString("main");
                        String description = jsonObjectWeather.getString("description");
                        JSONObject jsonObjectMain = jsonResponse.getJSONObject("main");
                        double temp = jsonObjectMain.getDouble("temp");
                        double feelslike = jsonObjectMain.getDouble("feels_like");
                        float pressure = jsonObjectMain.getInt("pressure");
                        int humidity = jsonObjectMain.getInt("humidity");
                        JSONObject jsonObjectWind = jsonResponse.getJSONObject("wind");
                        String wind = jsonObjectWind.getString("speed");
                        JSONObject jsonObjectClouds = jsonResponse.getJSONObject("clouds");
                        String clouds = jsonObjectClouds.getString("all");
                        JSONObject jsonObjectSys = jsonResponse.getJSONObject("sys");
                        String cityName = jsonResponse.getString("name");
                        resultTV.setTextColor(Color.BLACK);
                        output += "Aktualnie pogoda wygląda następująco: "
                                + "\n Temperatura: " + df.format(temp) + "°C"
                                + "\n Odczuwalna: " + df.format(feelslike) + "°C"
                                + "\n Wilgotność: " + humidity + "%"
                                + "\n Szczegóły: " + description
                                + "\n Prędkość wiatru: " + wind + "m/s"
                                + "\n Zachmurzenie: " + clouds + "%"
                                + "\n Ciśnienie: " + pressure + "hPa";
                        resultTV.setText(output);

                    } catch (JSONException e) {;
                        e.printStackTrace();
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(getApplicationContext(), error.toString().trim(), Toast.LENGTH_SHORT).show();
                }
            });

            RequestQueue requestQueue = Volley.newRequestQueue(getApplicationContext());
            requestQueue.add(stringRequest);
        }
    }
```
### **Pogoda dla aktualnej lokalizacji użytkownika**
* **pobranie lokalizacji (miasta) urzadzenia do zmiennej w celu załadowania pogody dla aktualnej lokalizacji** 
```java
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_getstarted);

        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);

        if (ActivityCompat.checkSelfPermission(GetStartedActivity.this, Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            getLocation();
        } else
            ActivityCompat.requestPermissions(GetStartedActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 44
            );

    }
        private void getLocation() {

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission
                (this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        fusedLocationProviderClient.getLastLocation().addOnCompleteListener(new OnCompleteListener<Location>() {
            @Override
            public void onComplete(@NonNull Task<Location> task) {
                Location location = task.getResult();
                if (location != null) {
                    try {
                        Geocoder geocoder = new Geocoder(GetStartedActivity.this, Locale.getDefault());

                        List<Address> addressList = geocoder.getFromLocation(
                                location.getLatitude(), location.getLongitude(), 1);
                        cityName = addressList.get(0).getLocality().toString();
                        Log.i("To jest miasto", "miasto:" + cityName);

                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                }
            }
        });
    }
    
    
```
* **załadowania pogody dla aktualnej lokalizacji** 
```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_getstarted);
        descriptionVal = findViewById(R.id.descriptionVal);
        tempVal = findViewById(R.id.tempVal);
        feelslikeVal = findViewById(R.id.feelslikeVal);
        humidityVal = findViewById(R.id.humidityVal);
        windVal = findViewById(R.id.windVal);
        getStartedCL = findViewById(R.id.getStartedCL);


        checkLocationIsEnabled();
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);

        if (ActivityCompat.checkSelfPermission(GetStartedActivity.this, Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            getLocation();
        } else
            ActivityCompat.requestPermissions(GetStartedActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 44
            );


        bGetStarted = findViewById(R.id.bGetStarted);

        bGetStarted.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                Intent i = new Intent(GetStartedActivity.this, ChoiceActivity.class);
                startActivity(i);
            }
        });

        String tempURL = "";
        tempURL = url + "?q=" + cityName + "&lang=pl&units=metric&appid=" + apiKey;

        StringRequest stringRequest = new StringRequest(Request.Method.POST, tempURL, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                //Log.d("response", response);
                String output = "";
                try {
                    JSONObject jsonResponse = new JSONObject(response);
                    JSONArray jsonArray = jsonResponse.getJSONArray("weather");
                    JSONObject jsonObjectWeather = jsonArray.getJSONObject(0);
                    String weather = jsonObjectWeather.getString("main");
                    String description = jsonObjectWeather.getString("description");
                    JSONObject jsonObjectMain = jsonResponse.getJSONObject("main");
                    double temp = jsonObjectMain.getDouble("temp");
                    double feelslike = jsonObjectMain.getDouble("feels_like");
                    float pressure = jsonObjectMain.getInt("pressure");
                    int humidity = jsonObjectMain.getInt("humidity");
                    JSONObject jsonObjectWind = jsonResponse.getJSONObject("wind");
                    String wind = jsonObjectWind.getString("speed");
                    JSONObject jsonObjectClouds = jsonResponse.getJSONObject("clouds");
                    String clouds = jsonObjectClouds.getString("all");
                    JSONObject jsonObjectSys = jsonResponse.getJSONObject("sys");
                    String cityName = jsonResponse.getString("name");
                    descriptionVal.setText(description);
                    tempVal.setText(temp + "°C");
                    feelslikeVal.setText(feelslike + "°C");
                    humidityVal.setText(humidity + "%");
                    windVal.setText(wind + "m/s");
                  }
               }
            }

```

* **Zmiana tła stosownie do aktualnej pogody** 

```java
switch (weather) {
                        case "Clear":
                            getStartedCL.setBackground(getDrawable(R.drawable.sun));
                            break;
                        case "Clouds":
                            getStartedCL.setBackground(getDrawable(R.drawable.clouds));
                            break;
                        case "Drizzle":
                            getStartedCL.setBackground(getDrawable(R.drawable.rain));
                            break;
                        case "Thunderstorm":
                            getStartedCL.setBackground(getDrawable(R.drawable.thunder));
                            break;
                        case "Snow":
                            getStartedCL.setBackground(getDrawable(R.drawable.snow));
                            break;
                        case "Fog":
                            getStartedCL.setBackground(getDrawable(R.drawable.fog));
                            break;
                        case "Sand":
                            getStartedCL.setBackground(getDrawable(R.drawable.fog));
                            break;
                        case "Dust":
                            getStartedCL.setBackground(getDrawable(R.drawable.fog));
                            break;
                        case "Ash":
                            getStartedCL.setBackground(getDrawable(R.drawable.fog));
                            break;
                        case "Tornado":
                            getStartedCL.setBackground(getDrawable(R.drawable.fog));
                            break;
                        default:
                            getStartedCL.setBackground(getDrawable(R.drawable.flower));
                    }

```

## Ilustracje
### Home page
![Landing page](/DelegationsMVC.Web/wwwroot/images/ScreenShots/welcome_page.PNG)
### Login page
![Login page](/DelegationsMVC.Web/wwwroot/images/ScreenShots/login_page.PNG)
### User's account data edit
![Account edit](/DelegationsMVC.Web/wwwroot/images/ScreenShots/EditEmployee_page.PNG)
### Users's delegation list
![Delegation list](/DelegationsMVC.Web/wwwroot/images/ScreenShots/delegation_list.PNG)
### Create/edit delegation
![Create delegation](/DelegationsMVC.Web/wwwroot/images/ScreenShots/delegation_create.PNG)
### Show delegation
![Show delegation](/DelegationsMVC.Web/wwwroot/images/ScreenShots/delegation_show.PNG)
### Show client and edit projects
![Show client](/DelegationsMVC.Web/wwwroot/images/ScreenShots/show_client.PNG)

  
