import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./useAppDispatch";
import { actions } from "@redux/reducers";

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};
