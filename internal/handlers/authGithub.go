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
	githubAuthURL      = "1"
	githubTokenURL     = "2"
	githubUserInfoURL  = "3"
	githubClientID     = "4"
	githubClientSecret = "5"
	redirectGithubUrl  = "6"
)

func (h *Handler) githubSignInRedirect(w http.ResponseWriter, r *http.Request) {
	URL, err := url.Parse(githubAuthURL)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	parameters := url.Values{}
	parameters.Add("client_id", githubClientID)
	parameters.Add("redirect_uri", redirectGithubUrl)
	parameters.Add("scope", "read:user user:email")
	parameters.Add("response_type", "code")
	URL.RawQuery = parameters.Encode()

	http.Redirect(w, r, URL.String(), http.StatusTemporaryRedirect)
}

func (h *Handler) githubSignInCallBack(w http.ResponseWriter, r *http.Request) {
	code := r.FormValue("code")
	token, err := getGitHubToken(code)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	userInfo, err := getGitHubUserInfo(token)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Создание пользователя или обновление информации
	user := models.User{
		Email:        userInfo.Email,
		Username:     userInfo.Login,
		PasswordHash: "SOMETthingQweasdb103@", // Псевдо-пароль
		AuthProvider: "github",
	}

	_ = h.services.CreateUser(&user)
	err = h.loginGithubOrGoogleUser(&user, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}

func getGitHubToken(code string) (string, error) {
	data := url.Values{
		"client_id":     {githubClientID},
		"client_secret": {githubClientSecret},
		"code":          {code},
		"redirect_uri":  {redirectGithubUrl},
	}

	req, err := http.NewRequest("POST", githubTokenURL, strings.NewReader(data.Encode()))
	if err != nil {
		return "", err
	}
	req.Header.Set("Accept", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", err
	}

	token, ok := result["access_token"].(string)
	if !ok {
		return "", fmt.Errorf("no access token found")
	}

	return token, nil
}

func getGitHubUserInfo(token string) (*UserInfo, error) {
	req, err := http.NewRequest("GET", githubUserInfoURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Accept", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var userInfo UserInfo
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return nil, err
	}

	return &userInfo, nil
}

type UserInfo struct {
	Login string `json:"login"`
	Email string `json:"email"`
}

func (h *Handler) loginGithubOrGoogleUser(user *models.User, w http.ResponseWriter) error {
	// Используйте тот же фиктивный пароль, который использовался при создании пользователя
	fakePassword := "SOMETthingQweasdb103@"

	session, _, err := h.services.CreateSession(user.Username, fakePassword)
	if err != nil {
		return err
	}

	cookie := http.Cookie{
		Name:     "session_token",
		Value:    session.Token,
		Expires:  session.ExpiresAt,
		HttpOnly: true,
	}
	http.SetCookie(w, &cookie)

	return nil
}
