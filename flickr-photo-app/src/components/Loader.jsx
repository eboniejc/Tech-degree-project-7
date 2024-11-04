import { DNA } from "react-loader-spinner"
//DNA loader from https://mhnpd.github.io/react-loader-spinner/docs/components/dna
function Loader() {
    return (
        <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        />
    )
  }
  
  export default Loader;
