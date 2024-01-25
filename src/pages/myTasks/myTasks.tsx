import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./myTasks.module.scss";

// import Button from "../../ui/buttons/button/button";

import { isContainRoute } from "../../utils/breadcrumbs";

const MyTasks: FC = (): JSX.Element => {
  const {state, pathname} = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(
    () => {
      if (state && !isContainRoute(state, url)) {
        navigate('', { state: [...state, { path: pathname, url, title: "Задачи" }], replace: true });
      }
    },
    [pathname, url, state]
  );


  return (
    <section className={styles.page}>
      <p>Мои Задачи</p>
    </section>
  );
};

export default MyTasks;
