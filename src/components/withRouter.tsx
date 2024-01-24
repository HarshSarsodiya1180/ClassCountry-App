import { useNavigate, useLocation } from "react-router-dom";

const withRouter = (Component: React.ComponentType<any>) => {
  const WithRouter = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} navigate={navigate} location={location} />;
  };
  return WithRouter;
};
export default withRouter;
