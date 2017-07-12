export class Constants {
  public static SERVER_URL: string = "http://chattio-app.herokuapp.com/";
  public static SERVER_WS: string = "ws://chattio-app.herokuapp.com";

  public static AUTH_TOKEN: string = "oauthtoken";
  public static REFRESH_TOKEN: string = "refresh_token";
  public static AUTHORIZATION: string = "Authorization";
  public static oauthLoginEndPointUrl: string = Constants.SERVER_URL + "oauth/token";
  public static clientId: string = "chattio";
  public static clientSecret: string = "secretsecret";
}
