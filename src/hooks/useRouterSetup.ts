import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setRouter } from "../redux/slices/routerSlice";
// import type { AppDispatch } from "../redux/store";

export const useRouterSetup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRouter(router));
  }, [router, dispatch]);
};
