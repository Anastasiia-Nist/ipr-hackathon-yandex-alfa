import { FC, useState, useEffect } from "react";
import { Outlet, useMatch } from "react-router";
import { useNavigate, useLocation } from "react-router-dom";

import stylesLayout from "./layout.module.scss";

import Card from "../../components/card/card";
import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import Button from "../../ui/buttons/button/button";

// Ссылки на проверочные константы (заглушки)
import { footerLinkList } from "../../ui/verificationConstants/verificationConstants.js";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchUser } from "../../services/slice/userSlice";
import { getIprApi } from "../../api/ipr";
import { selectUser } from "../../services/slice/userSlice";
import { selectIpr, fetchIpr } from "../../services/slice/iprSlice";

import Loader from "../loader/loader";

export interface ILayout {
  handlePopup(editing: object): void;
}

const Layout: FC<ILayout> = ({ handlePopup }) => {
  // const matchChat = useMatch('/chat/:id');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const { ipr } = useAppSelector(selectIpr);

  useEffect(() => {
    user && dispatch(fetchIpr(user.id));
  }, [user]);

  // console.log(user);
  // console.log(ipr);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const onClickIPR = () => {
    navigate(`/myipr/${ipr[0].id}`);
  };

  const onClickTeam = () => {
    navigate("/");
  };

  // вывод данных юзера в консоль
  // console.log(user);
  // getUsersAllInfoApi().then((res) => console.log(res));
  // if (user) { getIprApi(user?.id).then((res)=>console.log(res));}
  // getIprApi(user!.id).then((res)=>console.log(res));

  const nameAll = `${user?.last_name} ${user?.first_name} ${user?.patronymic}`

  return (
    <div className={stylesLayout.layout}>
      <section className={stylesLayout.layout__nav}>
        <Navigation />
      </section>
      <div className={stylesLayout.layout__card}>
        {user ? (
          <Card
            size="big"
            avatar={user.userpic}
            name={nameAll}
            appointment={user.position}
            handlePopup={handlePopup}
          />
        ) : (<Loader />)}
        <Button color="nav_white" width="304" heigth="48">
          Мои достижения
        </Button>
        <Button
          color="nav_white"
          width="304"
          heigth="48"
          onClick={onClickTeam}
          disabled={!location.pathname.includes("/myipr") ? true : false}
        >
          Моя команда
        </Button>
        <Button
          color="nav_white"
          width="304"
          heigth="48"
          onClick={onClickIPR}
          disabled={location.pathname.includes("/myipr") ? true : false}
        >
          Мои ИПР
        </Button>
      </div>
      <main className={stylesLayout.layout__page}>
        <Outlet />
      </main>
      <section className={stylesLayout.layout__footer}>
        <Footer footerLinkList={footerLinkList} />
      </section>
    </div>
  );
};

export default Layout;
