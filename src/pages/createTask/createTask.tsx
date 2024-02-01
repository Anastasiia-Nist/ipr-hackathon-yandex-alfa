import { FC, useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./createTask.module.scss";
import gridAreasLayout from "../../ui/gridAreasLayout/gridAreasLayout.module.scss"

import Button from "../../ui/buttons/button/button";

import { isContainRoute } from "../../utils/breadcrumbs";

const CreateTask: FC = (): JSX.Element => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const url = window.location.href;

  useEffect(() => {
    if (state && !isContainRoute(state, url)) {
      navigate("", {
        state: [
          ...state,
          { path: pathname, url, title: "Создание новой задачи" },
        ],
        replace: true,
      });
    }
  }, [pathname, url, state]);

  function onClick() {
    navigate(-1);
  }

  return (
    <>
      <h1 className={`${styles.title} ${gridAreasLayout.wrapper_title}`}>
        Создание новой задачи
      </h1>
      <div className={`${styles.wrapper} ${gridAreasLayout.wrapper_work_info}`}>
        <p>Здесь будет создание новой задачи</p>
      </div>
      <div className={`${styles.wrapper_button} ${gridAreasLayout.wrapper_buttons}`}>
        <Button color="red" width="281" heigth="56" onClick={onClick}>
          Добавить задачу
        </Button>
        <Button color="grey" width="281" heigth="56" onClick={onClick}>
          Отмена
        </Button>
      </div>
    </>
  );
};

export default CreateTask;
