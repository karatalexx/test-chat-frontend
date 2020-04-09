import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

type Props = {
  styles?: any;
  mapStateToProps?: any;
  mapDispatchToProps?: any;
  location?: boolean;
};

const injectDependencies = ({
  styles,
  mapStateToProps,
  mapDispatchToProps,
  location,
}: Props = {}) => (component: any) => {
  let componentContainer = component;

  if (mapStateToProps || mapDispatchToProps) {
    componentContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(componentContainer);
  }

  if (location) {
    componentContainer = withRouter(componentContainer);
  }

  return componentContainer;
};

export { injectDependencies };
