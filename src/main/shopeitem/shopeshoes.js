import Shoesheader from "../../common/shopeheader";
import Footer from "../../common/footer"
import {useNavigate } from 'react-router-dom';
import AdvancedExample from "./shopebenner";
import FilterComponent from "./FilterComponent";


function Shopeshoes(){
    let navigate = useNavigate();
    return(
       <>
               <Shoesheader></Shoesheader>
               <AdvancedExample></AdvancedExample>
               <FilterComponent></FilterComponent>
                    <Footer></Footer>
        </>
    )
}
export default Shopeshoes;