import { getPostsByUserId } from "api/postAPI";
import { getInfoUser } from "features/auth/authSlice";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export const useUserPosts = (onError, onSuccess) => {
  const userInfo = useSelector(getInfoUser);
  return useQuery(
    ["userPosts", userInfo?.USERID],
    () => getPostsByUserId(userInfo?.USERID),
    {
      enabled: !!userInfo?.USERID,
      refetchOnWindowFocus: false,
      onError: onError,
      onSuccess: onSuccess,
      select: (value) => {
        const formatData = value?.posts;
        return formatData;
      },
    }
  );
};

export default useUserPosts;
