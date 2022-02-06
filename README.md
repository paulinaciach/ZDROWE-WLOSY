# ZDROWE-WLOSY
#### Zdrowe Włosy jest to baza danych zawierająca składy kosmetyków do pielęgnacji włosów. 

## Spis treści 
* [Wprowadzenie](#wprowadzenie)
* [Linki](#linki)
* [Uruchomienie](#uruchomienie)
* [Architektura systemu i oprogramowania](#architektura-systemu-i-oprogramowania)
* [Ilustracje](#ilustracje)


## Linki 

<b>Server:</b> https://zdrowewlosy.herokuapp.com/ 
<br/>
<b>Front:</b> https://zdrowe-wlosy.netlify.app/

## Wprowadzenie 
 
Zdrowe włosy jest to serwis internetowy z baza danych zawierająca składy kosmetyków do pielęgnacji włosów.<br/>
Jako niezalogowany użytkownik możesz przeszukiwać bazę danych, natomiast jako zalogowany użytkownik 
możesz dodawać nowe kosmetyki i usuwać swoje wspiy, a także zostawiać 'like' pod ulubionymi i polecanymi produktami. Oczywiście edycja wpisów jest możliwa! <br/>
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

<b>client:</b>
* axios moment 
* react-file-base64
* redux 
* redux-thunk
* jwt-decode react-google-login
* react-router-dom

**Serwery:**
* Heroku
* Netlify

## Ilustracje
### Strona Główna
![image](https://user-images.githubusercontent.com/35393983/152700417-07da38cf-3658-488a-a8a1-3fce29efcbd9.png)
### Strona logowania
![image](https://user-images.githubusercontent.com/35393983/152699107-bf0f9772-8391-41b2-84fd-de4293a16c40.png)
### Autentykacja Google
![image](https://user-images.githubusercontent.com/35393983/152699636-3c4d675e-594e-4f74-84af-f64a3232ad32.png)
![image](https://user-images.githubusercontent.com/35393983/152699645-a0247604-30e9-4074-8689-38aa7b5a6a64.png)
### Widok zalogowanego użytkownika
![image](https://user-images.githubusercontent.com/35393983/152699131-3801bb29-e69a-4a9e-8633-322534cfae73.png)
### Ściaganie PDF
![tempsnip](https://user-images.githubusercontent.com/35393983/152699209-e220dcde-faae-4f09-9203-1d3829349d0e.png)
### Wyszukiwanie
![image](https://user-images.githubusercontent.com/35393983/152699236-50de1dd9-b4f1-4f46-b3cf-463a762c1177.png)
### Edycja
![image](https://user-images.githubusercontent.com/35393983/152700349-3fe8d960-9dc4-4c78-a796-140d0c8763f5.png)
![image](https://user-images.githubusercontent.com/35393983/152700359-b5266308-00cc-41e0-adf4-a840dcb94cf8.png)



  
