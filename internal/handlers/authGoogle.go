package handlers

import (
	"encoding/json"
	"fmt"
	"forum/internal/models"
	"net/http"
	"net/url"
	"strings"
)

const (
	authURL            = "1"
	tokenURL           = "2"
	googleClientID     = "3"
	googleClientSecret = "4"
	redirectURL        = "5"
	userInfoURL        = "6"
)

type AuthToken struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type,omitempty"`
}

type Userinfo struct {
	Email string `json:"email"`
	Name  string `json:"name"`
}

func (h *Handler) googleSignInRedirect(w http.ResponseWriter, r *http.Request) {
	URL, err := url.Parse(authURL)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	parameters := url.Values{}
	parameters.Add("client_id", googleClientID)
	parameters.Add("redirect_uri", redirectURL)
	parameters.Add("scope", "email profile")
	parameters.Add("response_type", "code")
	URL.RawQuery = parameters.Encode()
	http.Redirect(w, r, URL.String(), http.StatusTemporaryRedirect)
}

func (h *Handler) googleSignInCallBack(w http.ResponseWriter, r *http.Request) {
	code := r.FormValue("code")
	token, status, err := getGoogleToken(code, redirectURL)
	if err != nil {
		http.Error(w, err.Error(), status)
		return
	}
	req, err := http.NewRequest("GET", fmt.Sprintf(userInfoURL, token), nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	var userInfo Userinfo
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	user := models.User{
		Email:        userInfo.Email,
		Username:     userInfo.Name,
		PasswordHash: "SOMETthingQweasdb103@",
		AuthProvider: "google",
	}

	_ = h.services.CreateUser(&user)
	// Вызываем loginUser и передаем ему информацию о пользователе
	if err := h.loginGithubOrGoogleUser(&user, w); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "http://localhost:8080", http.StatusTemporaryRedirect)
}

func getGoogleToken(code, redirectUrl string) (string, int, error) {
	v := url.Values{
		"grant_type":    {"authorization_code"},
		"code":          {code},
		"redirect_uri":  {redirectUrl},
		"client_id":     {googleClientID},
		"client_secret": {googleClientSecret},
	}
	req, err := http.NewRequest(http.MethodPost, tokenURL, strings.NewReader(v.Encode()))
	if err != nil {
		return "", http.StatusInternalServerError, err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}
	defer resp.Body.Close()
	var token AuthToken
	if err := json.NewDecoder(resp.Body).Decode(&token); err != nil {
		return "", http.StatusInternalServerError, err
	}
	return token.AccessToken, http.StatusOK, nil
}
