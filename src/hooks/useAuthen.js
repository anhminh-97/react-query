import { ROUTER } from "constants/index";
import { parseJwt } from "helpers";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuthen = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const userToken = parseJwt(token);
    if (!(userToken && userToken?.id && userToken?.email)) {
      history.push(ROUTER.Home);
    }
  }, [history, token]);
};

const useNotAuthen = () => {
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const userToken = parseJwt(token);
    if (userToken && userToken?.id && userToken?.email) {
      history.push(ROUTER.Home);
    }
  }, [history, token]);
};

export { useAuthen, useNotAuthen };
