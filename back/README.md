## Authentication flow

We are using the oAuth 2 authentication flow.

Obtaining an access token :

`curl -X POST -vu acme:acmesecret http://localhost:8666/oauth/token -H "Accept: application/json" -d "password=password&username=user&grant_type=password&scope=openid"`


`curl -X POST -vu chameleon:chameleonsecret http://localhost:8666/oauth/token -H "Accept: application/json" -d "password=password&username=user&grant_type=password&scope=openid"`

Using the access token to hit a protected endpoint :

`curl -u acme:acmesecret http://localhost:8666/subject -H "Authorization: Bearer a96565f8-98d5-4a08-b307-a8f780d39098"`
