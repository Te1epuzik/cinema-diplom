import classes from "./login.module.scss";
import { Link } from "react-router-dom";
import GoingMoviLogo from "@/assets/Идёмвкино.svg";
import { Loader } from "../Loader/Loader";

type TProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: Error | null;
  data: any;
};

export const LoginView = ({
  handleChange,
  handleSubmit,
  isLoading,
  error,
  data,
}: TProps) => {
  return (
    <div className={classes["login"]}>
      <header className={classes["header"]}>
        <Link to="/" className={classes["logo"]}>
          <img
            className={classes["logo-svg"]}
            src={GoingMoviLogo}
            alt="Идем в кино"
          />
          <span className={classes["logo-admin"]}>Администраторская</span>
        </Link>
      </header>
      <div className={classes["autorization"]}>
        <div className={classes["autorization-top"]}>
          <h2 className={classes["title"]}>Авторизация</h2>
        </div>
        <form className={classes["form"]} onSubmit={handleSubmit}>
          {data && !data.success && (
            <span className={classes["error"]}>
              Ошибка, не верный логин или пароль!
            </span>
          )}
          {error && (
            <span className={classes["error"]}>
              Произошла ошибка! Попробуйте войти позже.
            </span>
          )}
          <label className={classes["email-label"]} htmlFor="email1">
            E-mail
          </label>
          <input
            onChange={handleChange}
            className={classes["mail-input"] + " " + "input-text"}
            type="email"
            name="login"
            id="email1"
            placeholder="example@domain.xyz"
            required
          />
          <label className={classes["password-label"]} htmlFor="pas1">
            Пароль
          </label>
          <input
            onChange={handleChange}
            autoComplete="off"
            className={classes["password-input"] + " " + "input-text"}
            type="password"
            name="password"
            id="pas1"
            required
          />
          <button className={classes["log-in"] + " " + "button"} type="submit">
            {isLoading ? <Loader /> : "Авторизоваться"}
          </button>
        </form>
      </div>
    </div>
  );
};
