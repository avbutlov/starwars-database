const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
      return (
        <Wrapped {...props}>
          {fn}
        </Wrapped>
      )
    };
  };

  export default withChildFunction